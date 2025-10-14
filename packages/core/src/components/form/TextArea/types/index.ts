import { ChangeEvent } from 'react';

/**
 * Props for the TextArea component.
 *
 * - `id`: Required unique identifier for the textarea (used for accessibility).
 * - `name`: Required name attribute for the textarea (used in form submissions).
 * - `className`: Optional class name for additional styling.
 * - `validate`: Optional validation state ('error', 'success', 'warning').
 * - `errorMessage`: Optional error message to display below the textarea.
 * - `placeholder`: Optional placeholder text displayed when the textarea is empty.
 * - `value`: Controlled value of the textarea.
 * - `onChange`: Callback function triggered on input change.
 * - `ariaDescribedBy`: Optional ID of the element describing the textarea (e.g., error message).
 * - `readOnly`: Optional boolean to make the textarea read-only.
 * - `disabled`: Optional boolean to disable the textarea.
 */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string; // Required for accessibility
  name?: string; // Required for form submission
  className?: string;
  validate?: 'error' | 'success' | 'warning'; // Explicit validation states
  errorMessage?: string; // Optional error message
  placeholder?: string;
  value?: string; // Controlled component value
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void; // Controlled component onChange handler
  ariaDescribedBy?: string; // Accessibility: ID of the element describing the textarea
  readOnly?: boolean; // Optional read-only state
  disabled?: boolean; // Optional disabled state
}
