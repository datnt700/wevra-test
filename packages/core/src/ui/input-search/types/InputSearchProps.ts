import React from 'react';

/**
 * Props for the InputSearch component.
 */
export interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The unique identifier for the input element.
   */
  id?: string;

  /**
   * The name attribute for the input element (used in form submission).
   */
  name?: string;

  /**
   * Additional CSS class for styling.
   */
  className?: string;

  /**
   * The status/variant of the input.
   * - 'default': Normal state with default styling
   * - 'error': Error state with red border and error styling
   * @default 'default'
   */
  status?: 'default' | 'error';

  /**
   * Error message to display below the input.
   * When provided, automatically sets the input to error state.
   */
  errorMessage?: string;

  /**
   * Placeholder text displayed when the input is empty.
   */
  placeholder?: string;

  /**
   * The current value of the input (controlled mode).
   */
  value?: string;

  /**
   * Callback function triggered when the input value changes.
   * @param e - The change event from the input element
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
