'use client';

/**
 * Switch component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Switch.styles
 */
import styled from '@emotion/styled';
import { Switch as RadixSwitch } from 'radix-ui';
import type { EventureTheme } from '../../../theme/theme';

type SwitchVariant = 'default' | 'primary';

interface VariantStyles {
  bgUnchecked: string;
  bgChecked: string;
}

/**
 * Get variant styles from theme tokens
 */
const getVariantStyles = (
  eventureTheme: EventureTheme,
  variant: SwitchVariant = 'default'
): VariantStyles => {
  const variantMap: Record<SwitchVariant, VariantStyles> = {
    default: {
      bgUnchecked: eventureTheme.colors.text.disabled,
      bgChecked: eventureTheme.colors.primary,
    },
    primary: {
      bgUnchecked: eventureTheme.colors.border.default,
      bgChecked: eventureTheme.colors.primary,
    },
  };

  return variantMap[variant];
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledLabel = styled.label`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      font-size: 1rem;
      color: ${eventureTheme.colors.text.primary};
      font-style: normal;
      font-weight: 500;
      line-height: 1.5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      transition: color 0.2s ease;

      &:hover {
        color: ${eventureTheme.colors.primary};
      }
    `;
  }}
`;

const StyledSwitchRoot = styled(RadixSwitch.Root)<{
  $hasShadow?: boolean;
  $variant?: SwitchVariant;
}>`
  ${({ theme, $hasShadow, $variant = 'default' }) => {
    const eventureTheme = theme as EventureTheme;
    const styles = getVariantStyles(eventureTheme, $variant);

    return `
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      width: 3rem;
      height: 1.5rem;
      background-color: ${styles.bgUnchecked};
      border-radius: 2rem;
      position: relative;
      cursor: pointer;
      transition: background-color 0.2s ease;
      padding: 0;
      border: none;
      ${$hasShadow ? `box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);` : ''}

      &[data-state='checked'] {
        background-color: ${styles.bgChecked};
      }

      &[data-disabled] {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px ${eventureTheme.colors.primary};
      }

      &:hover:not([data-disabled]) {
        opacity: 0.9;
      }
    `;
  }}
`;

const StyledSwitchThumb = styled(RadixSwitch.Thumb)`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      width: 1.25rem;
      height: 1.25rem;
      background-color: ${eventureTheme.colors.surface};
      border-radius: 2rem;
      transition: transform 0.2s ease;
      transform: translateX(0.125rem);
      will-change: transform;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      &[data-state='checked'] {
        transform: translateX(1.625rem);

        svg {
          color: ${eventureTheme.colors.primary};
        }
      }
    `;
  }}
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Label: StyledLabel,
  SwitchRoot: StyledSwitchRoot,
  SwitchThumb: StyledSwitchThumb,
};
