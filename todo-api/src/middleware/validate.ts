import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

export function validate<T>(schema: ZodSchema<T>, target: ValidationTarget = 'body') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const data = req[target];
    const result = schema.safeParse(data);

    if (!result.success) {
      next(result.error);
      return;
    }

    req[target] = result.data as typeof req[typeof target];
    next();
  };
}

export function validateBody<T>(schema: ZodSchema<T>) {
  return validate(schema, 'body');
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return validate(schema, 'query');
}

export function validateParams<T>(schema: ZodSchema<T>) {
  return validate(schema, 'params');
}
