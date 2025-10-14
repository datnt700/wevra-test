import { Styled } from './Alert.styles';
import { AlertProps } from '../types';

/**
 * A reusable Alert component designed to display messages with optional icons and variants.
 *
 * Features:
 * - Supports multiple variants (`success`, `warning`, `info`, `danger`, `error`) for different alert types.
 * - Provides an option to display a filled background for better visual emphasis.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Props:
 * - `icon`: Optional icon to display alongside the title.
 * - `title`: The main title or message of the alert (required).
 * - `description`: Optional description or additional information.
 * - `variant`: The variant of the alert (`success`, `warning`, `info`, `danger`, `error`).
 * - `isFilled`: Boolean indicating whether the alert should have a filled background.
 */
export const Alert = ({
  icon,
  variant = 'success',
  title,
  description,
  isFilled = false,
}: AlertProps): JSX.Element | null => {
  if (!title) return null; // Ensure there's always a title

  return (
    <Styled.Wrapper $variant={variant} $isFilled={isFilled} data-testid="alert" role="alert">
      <Styled.Title>
        {icon && <span aria-hidden="true">{icon}</span>}
        <span>{title}</span>
      </Styled.Title>
      {description && <Styled.Description>{description}</Styled.Description>}
    </Styled.Wrapper>
  );
};
