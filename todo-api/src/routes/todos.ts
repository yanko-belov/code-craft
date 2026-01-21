import { Router, Response, NextFunction } from 'express';
import { todoStore } from '../store/TodoStore.js';
import { NotFoundError } from '../errors/AppError.js';
import { validateBody, validateQuery, validateParams } from '../middleware/validate.js';
import {
  CreateTodoSchema,
  UpdateTodoSchema,
  ListTodosQuerySchema,
  TodoIdSchema,
  type Todo,
  type PaginatedResponse,
  type ApiResponse,
} from '../types/todo.js';
import type { AppRequest } from '../types/express.js';

const router = Router();

router.get(
  '/',
  validateQuery(ListTodosQuerySchema),
  (req: AppRequest, res: Response<ApiResponse<PaginatedResponse<Todo>>>, next: NextFunction) => {
    try {
      const query = req.query as unknown as ReturnType<typeof ListTodosQuerySchema.parse>;
      const result = todoStore.findAll(query);

      res.json({
        success: true,
        data: result,
        meta: {
          requestId: req.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/stats',
  (req: AppRequest, res: Response<ApiResponse<ReturnType<typeof todoStore.getStats>>>, next: NextFunction) => {
    try {
      const stats = todoStore.getStats();

      res.json({
        success: true,
        data: stats,
        meta: {
          requestId: req.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:id',
  validateParams(TodoIdSchema),
  (req: AppRequest, res: Response<ApiResponse<Todo>>, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const includeDeleted = req.query.includeDeleted === 'true';
      const todo = todoStore.findById(id, includeDeleted);

      if (!todo) {
        throw new NotFoundError('Todo', id);
      }

      res.json({
        success: true,
        data: todo,
        meta: {
          requestId: req.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validateBody(CreateTodoSchema),
  (req: AppRequest, res: Response<ApiResponse<Todo>>, next: NextFunction) => {
    try {
      const input = req.body as ReturnType<typeof CreateTodoSchema.parse>;
      const todo = todoStore.create(input);

      res.status(201).json({
        success: true,
        data: todo,
        meta: {
          requestId: req.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  validateParams(TodoIdSchema),
  validateBody(UpdateTodoSchema),
  (req: AppRequest, res: Response<ApiResponse<Todo>>, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const input = req.body as ReturnType<typeof UpdateTodoSchema.parse>;
      const todo = todoStore.update(id, input);

      if (!todo) {
        throw new NotFoundError('Todo', id);
      }

      res.json({
        success: true,
        data: todo,
        meta: {
          requestId: req.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  validateParams(TodoIdSchema),
  (req: AppRequest, res: Response<ApiResponse<Todo>>, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const permanent = req.query.permanent === 'true';

      if (permanent) {
        const todo = todoStore.findById(id, true);
        if (!todo) {
          throw new NotFoundError('Todo', id);
        }
        todoStore.hardDelete(id);
        res.status(204).send();
        return;
      }

      const todo = todoStore.softDelete(id);
      if (!todo) {
        throw new NotFoundError('Todo', id);
      }

      res.json({
        success: true,
        data: todo,
        meta: {
          requestId: req.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/:id/restore',
  validateParams(TodoIdSchema),
  (req: AppRequest, res: Response<ApiResponse<Todo>>, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const todo = todoStore.restore(id);

      if (!todo) {
        throw new NotFoundError('Todo', id);
      }

      res.json({
        success: true,
        data: todo,
        meta: {
          requestId: req.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export { router as todosRouter };
