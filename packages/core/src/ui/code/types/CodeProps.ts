import React from 'react';

/**
 * Props for the Code component.
 */
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Code content to display (text or React nodes).
   */
  children: React.ReactNode;

  /**
   * Custom CSS class for styling.
   */
  className?: string;
}
