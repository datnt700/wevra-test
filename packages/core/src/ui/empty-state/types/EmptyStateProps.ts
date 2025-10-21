import React from 'react';

/**
 * Props for the EmptyState component.
 */
export interface EmptyStateProps {
  /**
   * Custom content to display instead of default layout.
   * When provided, overrides title, subtitle, icon, and action props.
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
   * Main title text or ReactNode to display.
   */
  title?: React.ReactNode;

  /**
   * Subtitle text or ReactNode to display below the title.
   */
  subTitle?: React.ReactNode;

  /**
   * Icon to display above the title.
   */
  icon?: React.ReactNode;

  /**
   * Action button or component to display at the bottom.
   */
  action?: React.ReactNode;
}
