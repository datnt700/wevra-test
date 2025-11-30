import { ChangeEvent } from 'react';

/**
 * Props for the TextArea component.
 */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Unique identifier for the textarea (used for accessibility).
   */
  id?: string;

  /**
   * Name attribute for the textarea (used in form submissions).
   */
  name?: string;

  /**
   * Optional class name for additional styling.
   */
  className?: string;

  /**
   * Validation state for the textarea.
   * - 'error': Shows error styling
   * - 'success': Shows success styling
   * - 'warning': Shows warning styling
   */
  validate?: 'error' | 'success' | 'warning';

  /**
   * Error message to display below the textarea when validation fails.
   */
  errorMessage?: string;

  /**
   * Placeholder text displayed when the textarea is empty.
   */
  placeholder?: string;

  /**
   * Controlled value of the textarea.
   */
  value?: string;

  /**
   * Callback function triggered on input change.
   */
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * ID of the element describing the textarea (e.g., error message).
   * Used for accessibility (aria-describedby).
   */
  ariaDescribedBy?: string;

  /**
   * Whether the textarea is read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether the textarea is disabled.
   * @default false
   */
  disabled?: boolean;
}
