import { z } from 'zod';

// =============================================================================
// Todo Schema Definitions
// =============================================================================

/**
 * Priority levels for todos
 */
export const TodoPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export type TodoPriorityType = (typeof TodoPriority)[keyof typeof TodoPriority];

/**
 * Status values for todos
 */
export const TodoStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type TodoStatusType = (typeof TodoStatus)[keyof typeof TodoStatus];

// =============================================================================
// Zod Schemas
// =============================================================================

/**
 * Schema for creating a new todo
 */
export const CreateTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less')
    .trim(),
  description: z
    .string()
    .max(2000, 'Description must be 2000 characters or less')
    .trim()
    .optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  dueDate: z
    .string()
    .datetime({ message: 'Invalid ISO 8601 date format' })
    .optional(),
  tags: z
    .array(z.string().max(50).trim())
    .max(10, 'Maximum 10 tags allowed')
    .default([]),
});

/**
 * Schema for updating a todo (partial)
 */
export const UpdateTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(200, 'Title must be 200 characters or less')
    .trim()
    .optional(),
  description: z
    .string()
    .max(2000, 'Description must be 2000 characters or less')
    .trim()
    .nullable()
    .optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional(),
  dueDate: z
    .string()
    .datetime({ message: 'Invalid ISO 8601 date format' })
    .nullable()
    .optional(),
  tags: z
    .array(z.string().max(50).trim())
    .max(10, 'Maximum 10 tags allowed')
    .optional(),
});

/**
 * Schema for query parameters when listing todos
 */
export const ListTodosQuerySchema = z.object({
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  search: z.string().max(100).optional(),
  tag: z.string().max(50).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'dueDate', 'priority', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  includeDeleted: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
});

/**
 * Schema for ID parameter validation
 */
export const TodoIdSchema = z.object({
  id: z.string().uuid('Invalid todo ID format'),
});

// =============================================================================
// TypeScript Types (inferred from Zod schemas)
// =============================================================================

export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;
export type ListTodosQuery = z.infer<typeof ListTodosQuerySchema>;

/**
 * Full Todo entity with all fields
 */
export interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatusType;
  priority: TodoPriorityType;
  dueDate: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  deletedAt: string | null; // Soft delete support
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * API response wrapper for consistency
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    requestId: string;
    timestamp: string;
  };
}
