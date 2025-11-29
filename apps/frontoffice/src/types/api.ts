/**
 * API Response Types
 * Shared types for API responses across the application
 */

export interface ActionResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
