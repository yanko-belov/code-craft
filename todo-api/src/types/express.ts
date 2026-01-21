import { Request } from 'express';

/**
 * Extended Express Request with request ID for tracing
 */
export interface AppRequest extends Request {
  id: string;
}

/**
 * Typed request with validated body
 */
export interface TypedRequestBody<T> extends AppRequest {
  body: T;
}

/**
 * Typed request with validated params
 */
export interface TypedRequestParams<T> extends AppRequest {
  params: T;
}

/**
 * Typed request with validated query
 */
export interface TypedRequestQuery<T> extends AppRequest {
  query: T;
}

/**
 * Typed request with validated body and params
 */
export interface TypedRequest<TBody, TParams = Record<string, string>, TQuery = Record<string, unknown>> extends AppRequest {
  body: TBody;
  params: TParams;
  query: TQuery;
}
