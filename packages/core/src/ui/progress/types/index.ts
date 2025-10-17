/**
 * Progress bar component types
 * @module ProgressBar.types
 */

/**
 * Progress bar variant type
 */
export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

/**
 * Props for ProgressBar component
 */
export interface ProgressBarProps {
  /**
   * Progress percentage (0-100)
   * @default 0
   */
  progress?: number;

  /**
   * Show label with percentage text
   * @default false
   */
  hasLabel?: boolean;

  /**
   * Visual variant of the progress bar
   * @default 'default'
   */
  variant?: ProgressVariant;

  /**
   * Indeterminate mode for loading states
   * When true, displays animated loading state instead of determinate progress
   * @default false
   */
  isIndeterminate?: boolean;
}
