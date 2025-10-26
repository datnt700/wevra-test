'use client';

/**
 * Field component
 * A form field wrapper that groups a label with an input element
 * @module Field
 */
import { FieldProps } from '..';
import { Styled } from './Field.styles';

/**
 * A reusable field component for form inputs
 *
 * Features:
 * - Flexible layout (column or row orientation)
 * - Semantic HTML with proper label association
 * - Accessible label-input pairing
 * - Consistent spacing and styling
 *
 * @example
 * ```tsx
 * // Basic field with column layout
 * <Field
 *   label="Email"
 *   input={<input type="email" placeholder="Enter email" />}
 * />
 *
 * // Field with row layout
 * <Field
 *   type="row"
 *   label="Subscribe"
 *   input={<input type="checkbox" />}
 * />
 *
 * // Field with custom input component
 * <Field
 *   label="Description"
 *   input={<textarea rows={4} />}
 * />
 * ```
 */
export const Field = ({ label, input, type = 'column', ...other }: FieldProps) => {
  return (
    <Styled.Wrapper $type={type} {...other}>
      <Styled.Label>{label}</Styled.Label>
      <Styled.Input>{input}</Styled.Input>
    </Styled.Wrapper>
  );
};

Field.displayName = 'Field';
