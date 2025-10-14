import React from 'react';

/**
 * Props for the Alert component.
 */
export interface AlertProps {
  /**
   * Optional icon to display alongside the title.
   */
  icon?: React.ReactNode;

  /**
   * The main title or message of the alert (required).
   */
  title: string;

  /**
   * Optional description or additional information.
   */
  description?: string;

  /**
   * The variant of the alert (`success`, `warning`, `info`, `danger`, `error`).
   * - Default: 'success'
   */
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'error';

  /**
   * Boolean indicating whether the alert should have a filled background.
   * - Default: false
   */
  isFilled?: boolean;
}
