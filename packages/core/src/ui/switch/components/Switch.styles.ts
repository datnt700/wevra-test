'use client';

/**
 * Switch component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Switch.styles
 */
import styled from '@emotion/styled';
import { Switch as RadixSwitch } from 'radix-ui';
import { cssVars } from '../../../theme/tokens/colors';

type SwitchVariant = 'default' | 'primary';

interface VariantStyles {
  bgUnchecked: string;
  bgChecked: string;
}

/**
 * Get variant styles from theme tokens
 */
const getVariantStyles = (variant: SwitchVariant = 'default'): VariantStyles => {
  const variantMap: Record<SwitchVariant, VariantStyles> = {
    default: {
      bgUnchecked: cssVars.dark6,
      bgChecked: cssVars.mainColor,
    },
    primary: {
      bgUnchecked: cssVars.light5,
      bgChecked: cssVars.mainColor,
    },
  };

  return variantMap[variant];
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  color: ${cssVars.dark};
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
    color: ${cssVars.mainColor};
  }
`;

const StyledSwitchRoot = styled(RadixSwitch.Root)<{
  $hasShadow?: boolean;
  $variant?: SwitchVariant;
}>`
  ${({ $hasShadow, $variant = 'default' }) => {
    const styles = getVariantStyles($variant);

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
        box-shadow: 0 0 0 2px ${cssVars.mainColor};
      }

      &:hover:not([data-disabled]) {
        opacity: 0.9;
      }
    `;
  }}
`;

const StyledSwitchThumb = styled(RadixSwitch.Thumb)`
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${cssVars.light};
  border-radius: 2rem;
  transition: transform 0.2s ease;
  transform: translateX(0.125rem);
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &[data-state='checked'] {
    transform: translateX(1.5rem);

    svg {
      color: ${cssVars.mainColor};
    }
  }
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Label: StyledLabel,
  SwitchRoot: StyledSwitchRoot,
  SwitchThumb: StyledSwitchThumb,
};
