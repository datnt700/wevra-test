import React from 'react';

/**
 * Props for the Tag component.
 */
export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display in the tag (text, icons, or React nodes).
   */
  children?: React.ReactNode;

  /**
   * Custom CSS class for the tag body element.
   */
  className?: string;

  /**
   * Custom CSS class for the tag wrapper element.
   */
  wrapperClassName?: string;

  /**
   * Optional click handler. When provided, the tag becomes interactive with hover effects.
   */
  onClick?: () => void;

  /**
   * Optional URL for navigation. When provided, wraps content in an anchor tag (opens in new tab).
   */
  url?: string;

  /**
   * Whether to display a close button (X icon) on the tag.
   * @default false
   */
  hasClose?: boolean;

  /**
   * Callback function when the close button is clicked.
   * Only relevant when hasClose is true.
   */
  onCloseClick?: () => void;
}
