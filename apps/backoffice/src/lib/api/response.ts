import { NextResponse } from 'next/server';

/**
 * Standard API response format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * API response builder for successful responses
 */
export function apiSuccess<T>(data: T, meta?: ApiResponse['meta']): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    ...(meta && { meta }),
  });
}

/**
 * API response builder for error responses
 */
export function apiError(
  message: string,
  status: number = 500,
  code?: string,
  details?: unknown
): NextResponse<ApiResponse> {
  const error: { message: string; code?: string; details?: unknown } = { message };
  if (code) error.code = code;
  if (details) error.details = details;

  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

/**
 * Common API error responses
 */
export const ApiErrors = {
  unauthorized: (message = 'Unauthorized. Please log in.') =>
    apiError(message, 401, 'UNAUTHORIZED'),

  forbidden: (message = 'You do not have permission to perform this action.') =>
    apiError(message, 403, 'FORBIDDEN'),

  notFound: (resource = 'Resource', message?: string) =>
    apiError(message || `${resource} not found.`, 404, 'NOT_FOUND'),

  badRequest: (message = 'Invalid request parameters.', details?: unknown) =>
    apiError(message, 400, 'BAD_REQUEST', details),

  conflict: (message = 'Resource already exists.') => apiError(message, 409, 'CONFLICT'),

  planLimitReached: (message: string, details?: { needsUpgrade?: boolean; remaining?: number }) =>
    apiError(message, 403, 'PLAN_LIMIT_REACHED', details),

  internalError: (message = 'An internal error occurred. Please try again later.') =>
    apiError(message, 500, 'INTERNAL_ERROR'),
};
