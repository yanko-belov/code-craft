import { Request, Response } from 'express';
import type { ApiResponse } from '../types/todo.js';

export function notFoundHandler(req: Request, res: Response<ApiResponse<never>>): void {
  const requestId = (req as Request & { id?: string }).id || 'unknown';

  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
    meta: {
      requestId,
      timestamp: new Date().toISOString(),
    },
  });
}
