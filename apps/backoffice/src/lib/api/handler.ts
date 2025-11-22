import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { ApiError } from './errors';
import { apiError, apiSuccess, type ApiResponse } from './response';
import type { Session } from 'next-auth';

/**
 * API handler context with authenticated session
 */
export interface ApiContext {
  session: Session | null;
  params?: Record<string, string>;
}

/**
 * API handler function type
 */
export type ApiHandler<T = unknown> = (
  request: NextRequest,
  context: ApiContext
) => Promise<NextResponse<ApiResponse<T>>>;

/**
 * Wrapper for API handlers with automatic error handling and session injection
 */
export function withApiHandler<T = unknown>(
  handler: ApiHandler<T>,
  options?: {
    requireAuth?: boolean;
    allowedRoles?: string[];
  }
) {
  return async (
    request: NextRequest,
    routeContext?: { params: Promise<Record<string, string>> }
  ): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      // Get session
      const session = await auth();

      // Check authentication if required
      if (options?.requireAuth !== false && !session?.user?.id) {
        return apiError('Unauthorized. Please log in.', 401, 'UNAUTHORIZED') as NextResponse<
          ApiResponse<T>
        >;
      }

      // Check role-based access
      if (options?.allowedRoles && session?.user?.role) {
        if (!options.allowedRoles.includes(session.user.role)) {
          return apiError(
            'You do not have permission to perform this action.',
            403,
            'FORBIDDEN'
          ) as NextResponse<ApiResponse<T>>;
        }
      }

      // Resolve params if provided
      const params = routeContext?.params ? await routeContext.params : undefined;

      // Call the handler with context
      return await handler(request, { session, params });
    } catch (error) {
      // Handle custom API errors
      if (error instanceof ApiError) {
        return apiError(error.message, error.statusCode, error.code, error.details) as NextResponse<
          ApiResponse<T>
        >;
      }

      // Log unexpected errors
      console.error('API handler error:', error);

      // Handle Prisma errors
      if (error && typeof error === 'object' && 'code' in error) {
        const prismaError = error as { code: string; meta?: unknown };

        if (prismaError.code === 'P2002') {
          return apiError('Resource already exists.', 409, 'CONFLICT') as NextResponse<
            ApiResponse<T>
          >;
        }
        if (prismaError.code === 'P2025') {
          return apiError('Resource not found.', 404, 'NOT_FOUND') as NextResponse<ApiResponse<T>>;
        }
      }

      // Generic error response
      return apiError(
        'An internal error occurred. Please try again later.',
        500,
        'INTERNAL_ERROR'
      ) as NextResponse<ApiResponse<T>>;
    }
  };
}

/**
 * Helper to create successful API responses
 */
export { apiSuccess, apiError };
