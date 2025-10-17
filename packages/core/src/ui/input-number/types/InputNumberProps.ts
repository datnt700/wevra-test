import React from 'react';

/**
 * Variant types for input styling
 */
export type InputVariant = 'default' | 'success' | 'warning' | 'danger';

/**
 * Props for the Stepper component (number input with increment/decrement buttons).
 */
export interface StepperProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
   * The current numeric value of the stepper (controlled mode).
   */
  value?: number;

  /**
   * Error message to display below the stepper.
   * When provided, automatically sets the stepper to danger variant.
   */
  errorMessage?: string;

  /**
   * Callback function triggered when the stepper value changes.
   * @param e - The change event from the input element
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The variant/style of the stepper.
   * - 'default': Normal state with default styling
   * - 'success': Success state with green border
   * - 'warning': Warning state with yellow border
   * - 'danger': Error state with red border
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * Whether the stepper is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the stepper is read-only (cannot be changed).
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Minimum allowed value.
   */
  min?: number;

  /**
   * Maximum allowed value.
   */
  max?: number;

  /**
   * Step increment/decrement value.
   * @default 1
   */
  step?: number;
}

/**
 * Props for the InputNumber component.
 */
export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
   * Placeholder text displayed when the input is empty.
   */
  placeholder?: string;

  /**
   * The current numeric value of the input (controlled mode).
   */
  value?: number;

  /**
   * Error message to display below the input.
   * When provided, automatically sets the input to danger variant.
   */
  errorMessage?: string;

  /**
   * Whether to show a clear button to reset the input value.
   * @default false
   */
  hasClearButton?: boolean;

  /**
   * Callback function triggered when the input value changes.
   * @param e - The change event from the input element
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The variant/style of the input.
   * - 'default': Normal state with default styling
   * - 'success': Success state with green border
   * - 'warning': Warning state with yellow border
   * - 'danger': Error state with red border
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * Whether the input is disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the input is read-only (cannot be changed).
   * @default false
   */
  isReadOnly?: boolean;
}
