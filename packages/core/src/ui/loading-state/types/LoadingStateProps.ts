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

  /**
   * @deprecated Image to display (not currently implemented)
   */
  image?: React.ReactNode;

  /**
   * @deprecated Large image URL (not currently implemented)
   */
  largeImage?: string;

  /**
   * @deprecated Full width setting (not currently implemented)
   */
  fullWidth?: string;

  /**
   * @deprecated Footer content (not currently implemented)
   */
  footerContent?: React.ReactNode;

  /**
   * @deprecated Size variant (not currently implemented)
   */
  size?: 'sm' | 'md';
}
