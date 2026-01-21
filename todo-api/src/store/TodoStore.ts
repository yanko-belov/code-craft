import { v4 as uuidv4 } from 'uuid';
import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
  ListTodosQuery,
  PaginatedResponse,
  TodoPriorityType,
} from '../types/todo.js';

/**
 * Priority order for sorting
 */
const PRIORITY_ORDER: Record<TodoPriorityType, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * In-memory Todo store
 * In production, this would be replaced with a database adapter
 */
export class TodoStore {
  private todos: Map<string, Todo> = new Map();

  /**
   * Create a new todo
   */
  create(input: CreateTodoInput): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: uuidv4(),
      title: input.title,
      description: input.description ?? null,
      status: 'pending',
      priority: input.priority,
      dueDate: input.dueDate ?? null,
      tags: input.tags,
      createdAt: now,
      updatedAt: now,
      completedAt: null,
      deletedAt: null,
    };

    this.todos.set(todo.id, todo);
    return todo;
  }

  /**
   * Find a todo by ID (excludes soft-deleted unless specified)
   */
  findById(id: string, includeDeleted = false): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) return undefined;
    if (!includeDeleted && todo.deletedAt !== null) return undefined;
    return todo;
  }

  /**
   * List todos with filtering, sorting, and pagination
   */
  findAll(query: ListTodosQuery): PaginatedResponse<Todo> {
    let results = Array.from(this.todos.values());

    // Filter out soft-deleted unless requested
    if (!query.includeDeleted) {
      results = results.filter((todo) => todo.deletedAt === null);
    }

    // Apply filters
    if (query.status) {
      results = results.filter((todo) => todo.status === query.status);
    }

    if (query.priority) {
      results = results.filter((todo) => todo.priority === query.priority);
    }

    if (query.tag) {
      const searchTag = query.tag.toLowerCase();
      results = results.filter((todo) =>
        todo.tags.some((t) => t.toLowerCase() === searchTag)
      );
    }

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      results = results.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          (todo.description?.toLowerCase().includes(searchLower) ?? false)
      );
    }

    // Sort
    const sortMultiplier = query.sortOrder === 'asc' ? 1 : -1;
    results.sort((a, b) => {
      let comparison = 0;

      switch (query.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          comparison = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
          break;
        case 'dueDate':
          if (a.dueDate === null && b.dueDate === null) comparison = 0;
          else if (a.dueDate === null) comparison = 1;
          else if (b.dueDate === null) comparison = -1;
          else comparison = a.dueDate.localeCompare(b.dueDate);
          break;
        case 'updatedAt':
          comparison = a.updatedAt.localeCompare(b.updatedAt);
          break;
        case 'createdAt':
        default:
          comparison = a.createdAt.localeCompare(b.createdAt);
          break;
      }

      return comparison * sortMultiplier;
    });

    // Paginate
    const total = results.length;
    const totalPages = Math.ceil(total / query.limit);
    const start = (query.page - 1) * query.limit;
    const paginatedResults = results.slice(start, start + query.limit);

    return {
      data: paginatedResults,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages,
        hasNextPage: query.page < totalPages,
        hasPrevPage: query.page > 1,
      },
    };
  }

  /**
   * Update a todo
   */
  update(id: string, input: UpdateTodoInput): Todo | undefined {
    const todo = this.findById(id);
    if (!todo) return undefined;

    const now = new Date().toISOString();
    const updated: Todo = {
      ...todo,
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.priority !== undefined && { priority: input.priority }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.dueDate !== undefined && { dueDate: input.dueDate }),
      ...(input.tags !== undefined && { tags: input.tags }),
      updatedAt: now,
    };

    // Track completion time
    if (input.status === 'completed' && todo.status !== 'completed') {
      updated.completedAt = now;
    } else if (input.status !== undefined && input.status !== 'completed') {
      updated.completedAt = null;
    }

    this.todos.set(id, updated);
    return updated;
  }

  /**
   * Soft delete a todo
   */
  softDelete(id: string): Todo | undefined {
    const todo = this.findById(id);
    if (!todo) return undefined;

    const now = new Date().toISOString();
    const deleted: Todo = {
      ...todo,
      deletedAt: now,
      updatedAt: now,
    };

    this.todos.set(id, deleted);
    return deleted;
  }

  /**
   * Hard delete a todo (permanent)
   */
  hardDelete(id: string): boolean {
    return this.todos.delete(id);
  }

  /**
   * Restore a soft-deleted todo
   */
  restore(id: string): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo || todo.deletedAt === null) return undefined;

    const now = new Date().toISOString();
    const restored: Todo = {
      ...todo,
      deletedAt: null,
      updatedAt: now,
    };

    this.todos.set(id, restored);
    return restored;
  }

  /**
   * Get statistics about todos
   */
  getStats(): {
    total: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
    overdue: number;
  } {
    const todos = Array.from(this.todos.values()).filter(
      (t) => t.deletedAt === null
    );
    const now = new Date().toISOString();

    const byStatus: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    let overdue = 0;

    for (const todo of todos) {
      byStatus[todo.status] = (byStatus[todo.status] ?? 0) + 1;
      byPriority[todo.priority] = (byPriority[todo.priority] ?? 0) + 1;

      if (
        todo.dueDate &&
        todo.dueDate < now &&
        todo.status !== 'completed' &&
        todo.status !== 'cancelled'
      ) {
        overdue++;
      }
    }

    return {
      total: todos.length,
      byStatus,
      byPriority,
      overdue,
    };
  }

  /**
   * Clear all todos (useful for testing)
   */
  clear(): void {
    this.todos.clear();
  }
}

// Singleton instance
export const todoStore = new TodoStore();
