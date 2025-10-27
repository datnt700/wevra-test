'use client';

/**
 * Emotion styles for Radio component with direct theme token access.
 * Follows best practices: helper functions, transient props, TypeScript types.
 */
import styled from '@emotion/styled';
import { RadioGroup } from 'radix-ui';
import { cssVars } from '../../../theme/tokens/colors';

type RadioSize = 'sm' | 'default' | 'md' | 'lg';

interface SizeStyles {
  itemSize: string;
  indicatorSize: string;
  fontSize: string;
  gap: string;
}

/**
 * Helper function to get size-specific styles for Radio component.
 */
const getSizeStyles = (size: RadioSize = 'default'): SizeStyles => {
  const sizeMap: Record<RadioSize, SizeStyles> = {
    sm: {
      itemSize: '1.25rem',
      indicatorSize: '0.5rem',
      fontSize: '0.875rem',
      gap: '0.375rem',
    },
    default: {
      itemSize: '1.75rem',
      indicatorSize: '0.75rem',
      fontSize: '1rem',
      gap: '0.5rem',
    },
    md: {
      itemSize: '2rem',
      indicatorSize: '0.875rem',
      fontSize: '1.125rem',
      gap: '0.625rem',
    },
    lg: {
      itemSize: '2.5rem',
      indicatorSize: '1rem',
      fontSize: '1.25rem',
      gap: '0.75rem',
    },
  };
  return sizeMap[size];
};

const StyledRadioWrapper = styled.div<{ $size?: RadioSize }>`
  ${({ $size = 'default' }) => {
    const styles = getSizeStyles($size);
    return `
      display: flex;
      align-items: center;
      gap: ${styles.gap};
    `;
  }}
`;

const StyledRadioItem = styled(RadioGroup.Item)<{
  $size?: RadioSize;
  $isDisabled?: boolean;
}>`
  ${({ $size = 'default', $isDisabled }) => {
    const styles = getSizeStyles($size);
    return `
      background-color: ${cssVars.light};
      width: ${styles.itemSize};
      height: ${styles.itemSize};
      border-radius: 100%;
      border: 2px solid ${cssVars.dark6};
      transition: all 0.2s ease;
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
      opacity: ${$isDisabled ? '0.5' : '1'};

      &:hover:not(:disabled) {
        border-color: ${cssVars.mainColor};
        background-color: ${cssVars.mainColorLight}20;
      }

      &:focus-visible {
        outline: 2px solid ${cssVars.mainColor};
        outline-offset: 2px;
      }

      &[data-state="checked"] {
        border-color: ${cssVars.mainColor};
        background-color: ${cssVars.light};
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: ${cssVars.light4};
      }
    `;
  }}
`;

const StyledIndicator = styled(RadioGroup.Indicator)<{ $size?: RadioSize }>`
  ${({ $size = 'default' }) => {
    const styles = getSizeStyles($size);
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: ${styles.indicatorSize};
        height: ${styles.indicatorSize};
        border-radius: 50%;
        background-color: ${cssVars.mainColor};
        transition: transform 0.15s ease;
        transform: scale(1);
      }

      &[data-state="unchecked"]::after {
        transform: scale(0);
      }
    `;
  }}
`;

const StyledLabel = styled.label<{
  $size?: RadioSize;
  $isDisabled?: boolean;
}>`
  ${({ $size = 'default', $isDisabled }) => {
    const styles = getSizeStyles($size);
    return `
      color: ${$isDisabled ? cssVars.dark6 : cssVars.dark};
      font-size: ${styles.fontSize};
      line-height: 1.5;
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
      user-select: none;
      transition: color 0.2s ease;

      &:hover {
        color: ${$isDisabled ? cssVars.dark6 : cssVars.mainColor};
      }
    `;
  }}
`;

export const Styled = {
  RadioWrapper: StyledRadioWrapper,
  RadioItem: StyledRadioItem,
  Indicator: StyledIndicator,
  Label: StyledLabel,
};
