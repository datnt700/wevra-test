import { Styled } from './Label.styles';
import { LabelProps } from '..';

/**
 * A reusable Label component designed for form fields with optional required indicators.
 *
 * Features:
 * - Supports associating the label with an input via the `htmlFor` prop.
 * - Displays a required indicator (`*`) if the `required` prop is set to `true`.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Props:
 * - `htmlFor`: The ID of the associated form field (used for accessibility).
 * - `className`: Optional class name for additional styling.
 * - `children`: The label text or content.
 * - `required`: Boolean indicating whether the label represents a required field.
 */
export const Label = ({ htmlFor, className, children, required = false, ...other }: LabelProps) => {
  if (!children) return null;

  return (
    <Styled.Label htmlFor={htmlFor} className={className} $required={required} {...other}>
      <Styled.Title>{children}</Styled.Title>
    </Styled.Label>
  );
};
