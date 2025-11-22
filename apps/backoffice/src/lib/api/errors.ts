/**
 * Custom API error classes for better error handling
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized. Please log in.') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'You do not have permission to perform this action.') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = 'Resource', message?: string) {
    super(message || `${resource} not found.`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Invalid request parameters.', details?: unknown) {
    super(message, 400, 'BAD_REQUEST', details);
    this.name = 'BadRequestError';
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Resource already exists.') {
    super(message, 409, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class PlanLimitError extends ApiError {
  constructor(
    message: string,
    details?: { needsUpgrade?: boolean; remaining?: number; current?: number }
  ) {
    super(message, 403, 'PLAN_LIMIT_REACHED', details);
    this.name = 'PlanLimitError';
  }
}
