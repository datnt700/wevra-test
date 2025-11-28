import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Props for the Badge component.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display in the badge (text, icons, or React nodes).
   */
  children?: React.ReactNode;

  /**
   * Visual style variant of the badge.
   * @default 'default'
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge.
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Custom CSS class for the body element (transient prop, not applied to wrapper).
   */
  className?: string;

  /**
   * Custom CSS class for the wrapper element.
   */
  wrapperClassName?: string;

  /**
   * Optional click handler. When provided, the badge becomes interactive with hover effects.
   */
  onClick?: () => void;

  /**
   * Optional URL for navigation. When provided, wraps content in an anchor tag (opens in new tab).
   */
  url?: string;
}
