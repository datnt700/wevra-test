import React from 'react';

/**
 * Props for the Drawer component.
 */
export interface DrawerProps {
  /**
   * Optional header content (e.g., title or actions).
   */
  header?: React.ReactNode;

  /**
   * Boolean indicating whether the drawer is open.
   */
  isOpen: boolean;

  /**
   * Callback function triggered when the drawer closes.
   */
  onClose: () => void;

  /**
   * The main content of the drawer.
   */
  children: React.ReactNode;

  /**
   * Optional footer content (e.g., buttons or actions).
   */
  footer?: React.ReactNode;

  /**
   * The position of the drawer (`right`, `left`, `top`, `bottom`).
   * - Default: 'right'
   */
  position?: 'right' | 'left' | 'top' | 'bottom';

  /**
   * Optional class name for additional styling.
   */
  className?: string;
}
