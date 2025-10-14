import { FieldProps } from '..';
import { Styled } from './Field.styles';

/**
 * A reusable Field component designed to group a label and an input together.
 *
 * Features:
 * - Supports dynamic layout (column or row) for flexible positioning of label and input.
 * - Provides accessibility support with proper ARIA attributes and semantic HTML structure.
 * - Includes styled components for consistent styling of the wrapper, label, and input.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Use Cases:
 * - Form fields where a label is associated with an input (e.g., text inputs, selects, etc.).
 * - Dynamic sizing and alignment options for responsive designs.
 */
export const Field = ({ label, input, type = 'column', ...other }: FieldProps): JSX.Element => {
  return (
    <Styled.Wrapper $type={type} {...other}>
      <Styled.Label>{label}</Styled.Label>
      <Styled.Input>{input}</Styled.Input>
    </Styled.Wrapper>
  );
};

Field.displayName = 'Field';
