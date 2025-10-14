import React from 'react';

/**
 * Props for the Label component.
 *
 * - Extends `React.LabelHTMLAttributes<HTMLLabelElement>` to include native label attributes.
 * - Adds optional props for custom functionality like required indicators and children content.
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The `htmlFor` attribute associates the label with a form control by its ID.
   * - Default: undefined
   */
  htmlFor?: string;

  /**
   * Optional class name for additional styling.
   * - Default: undefined
   */
  className?: string;

  /**
   * The content of the label (text or other React elements).
   * - Default: undefined
   */
  children?: React.ReactNode;

  /**
   * Boolean indicating whether the label represents a required field.
   * - If `true`, a required indicator (`*`) will be displayed.
   * - Default: false
   */
  required?: boolean;
}
