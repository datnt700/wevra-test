import React from 'react';

/**
 * Props for the Modal component.
 */
export interface ModalProps {
  /**
   * Optional header content (e.g., title or actions).
   */
  header?: React.ReactNode;

  /**
   * Boolean indicating whether the modal is open.
   */
  isOpen: boolean;

  /**
   * Callback function triggered when the modal closes.
   */
  onClose: () => void;

  /**
   * The main content of the modal.
   */
  children: React.ReactNode;

  /**
   * Optional footer content (e.g., buttons or actions).
   */
  footer?: React.ReactNode;

  /**
   * The position of the modal (`center`, `top`, `bottom`).
   * - Default: 'center'
   */
  position?: 'center' | 'top' | 'bottom';

  /**
   * Optional class name for additional styling.
   */
  className?: string;
}
