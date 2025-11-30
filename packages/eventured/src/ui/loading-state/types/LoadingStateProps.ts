import React from 'react';

/**
 * Props for the LoadingState component.
 */
export interface LoadingStateProps {
  /**
   * Custom content to display instead of default layout.
   * When provided, overrides title, subtitle, and spinner.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class for styling (transient prop, not applied to DOM).
   */
  className?: string;

  /**
   * Additional CSS class for wrapper (transient prop, not applied to DOM).
   */
  wrapperClassName?: string;

  /**
   * Main title text or ReactNode to display below the spinner.
   */
  title?: React.ReactNode;

  /**
   * Subtitle text or ReactNode to display below the title.
   */
  subTitle?: React.ReactNode;
}
