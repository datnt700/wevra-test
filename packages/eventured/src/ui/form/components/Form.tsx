import { Styled } from './Form.styles';
import { FormProps } from '..';

/**
 * A reusable Form component designed to serve as a container for form fields and controls.
 *
 * Features:
 * - Provides a flexible layout with a column-based structure and adjustable spacing between elements.
 * - Supports custom class names and additional attributes for extended functionality.
 * - Ensures accessibility by allowing proper grouping of form elements.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Use Cases:
 * - Wrapping form fields such as inputs, selects, checkboxes, and buttons.
 * - Creating structured and accessible forms with consistent styling.
 * - Easily integrating with other styled components or design system elements.
 */
export const Form = ({ children, className, ...other }: FormProps) => {
  return (
    <Styled.FormWrapper className={className} {...other}>
      {children}
    </Styled.FormWrapper>
  );
};

Form.displayName = 'Form';
