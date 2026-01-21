import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { logger } from '../utils/logger.js';
import { isProduction } from '../config/index.js';
import type { ApiResponse } from '../types/todo.js';

function formatZodError(error: ZodError): { field: string; message: string }[] {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response<ApiResponse<never>>,
  _next: NextFunction
): void => {
  const requestId = (req as Request & { id?: string }).id || 'unknown';

  if (err instanceof ZodError) {
    logger.warn({ requestId, errors: err.errors }, 'Validation error');
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: formatZodError(err),
      },
      meta: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error({ requestId, err }, 'Non-operational error');
    } else {
      logger.warn({ requestId, code: err.code, message: err.message }, 'Operational error');
    }

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && !isProduction ? { details: err.details } : {}),
      },
      meta: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  logger.error({ requestId, err }, 'Unexpected error');

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: isProduction ? 'An unexpected error occurred' : err.message,
      ...(!isProduction ? { stack: err.stack } : {}),
    },
    meta: {
      requestId,
      timestamp: new Date().toISOString(),
    },
  });
};
