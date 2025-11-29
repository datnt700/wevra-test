import { logger } from './logger';
import type { LogMetadata } from './types';

/**
 * Enhanced error logging with context
 */
export function logError(error: unknown, context?: LogMetadata): void {
  const errorDetails: LogMetadata = {
    ...context,
  };

  if (error instanceof Error) {
    errorDetails.name = error.name;
    errorDetails.message = error.message;
    errorDetails.stack = error.stack;

    // Extract additional error properties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorObj = error as any;
    if (errorObj.code) errorDetails.code = errorObj.code;
    if (errorObj.statusCode) errorDetails.statusCode = errorObj.statusCode;
    if (errorObj.cause) errorDetails.cause = errorObj.cause;
  } else if (typeof error === 'string') {
    errorDetails.message = error;
  } else {
    errorDetails.error = error;
  }

  logger.error('An error occurred', errorDetails);
}

/**
 * Log error boundary errors
 */
export function logErrorBoundary(error: Error, errorInfo: { componentStack: string }): void {
  logError(error, {
    type: 'ErrorBoundary',
    componentStack: errorInfo.componentStack,
  });
}

/**
 * Log promise rejection errors
 */
export function logUnhandledRejection(event: PromiseRejectionEvent): void {
  logError(event.reason, {
    type: 'UnhandledPromiseRejection',
    promise: event.promise,
  });
}
