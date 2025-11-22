'use client';

/**
 * Checkbox component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Checkbox.styles
 */
import styled from '@emotion/styled';
import { Checkbox as RadixCheckbox } from 'radix-ui';
import type { TaviaTheme } from '../../../theme/theme';

type CheckboxSize = 'sm' | 'default' | 'md' | 'lg';

interface SizeStyles {
  size: string;
  fontSize: string;
}

/**
 * Get size styles from theme tokens
 */
const getSizeStyles = (size: CheckboxSize = 'default'): SizeStyles => {
  const sizeMap: Record<CheckboxSize, SizeStyles> = {
    sm: {
      size: '1rem',
      fontSize: '0.75rem',
    },
    default: {
      size: '1.5rem',
      fontSize: '1rem',
    },
    md: {
      size: '1.5rem',
      fontSize: '1rem',
    },
    lg: {
      size: '1.75rem',
      fontSize: '1.25rem',
    },
  };

  return sizeMap[size];
};

const StyledCheckboxWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledCheckboxRoot = styled(RadixCheckbox.Root, {
  shouldForwardProp: (prop: string) => !prop.startsWith('$'),
})<{
  $isDisabled?: boolean;
  $size?: CheckboxSize;
}>`
  ${({ theme, $isDisabled, $size = 'default' }) => {
    const taviaTheme = theme as TaviaTheme;
    const styles = getSizeStyles($size);

    return `
      background-color: ${taviaTheme.colors.surface};
      width: ${styles.size};
      height: ${styles.size};
      border-radius: ${taviaTheme.radii.sm};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
      border: 1px solid ${taviaTheme.colors.text.primary};
      transition: all 0.2s ease-in-out;

      ${
        $isDisabled
          ? `
        opacity: 0.5;
      `
          : `
        &:hover {
          background-color: ${taviaTheme.colors.gray.mainColorLight6};
          border-color: ${taviaTheme.colors.primary};
        }

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${taviaTheme.colors.primary};
        }

        &[data-state="checked"] {
          background-color: ${taviaTheme.colors.primary};
          border-color: ${taviaTheme.colors.primary};

          &:hover {
            background-color: ${taviaTheme.colors.gray.mainColorDark};
          }
        }
      `
      }
    `;
  }}
`;

const StyledCheckboxIndicator = styled(RadixCheckbox.Indicator, {
  shouldForwardProp: (prop: string) => !prop.startsWith('$'),
})<{ $size?: string }>`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      color: ${taviaTheme.colors.surface};
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    `;
  }}
`;

const StyledCheckboxLabel = styled.label<{ $size?: CheckboxSize }>`
  ${({ theme, $size = 'default' }) => {
    const taviaTheme = theme as TaviaTheme;
    const styles = getSizeStyles($size);

    return `
      color: ${taviaTheme.colors.text.primary};
      font-size: ${styles.fontSize};
      line-height: 1.5;
      cursor: pointer;
      user-select: none;
      transition: color 0.2s ease;

      &:hover {
        color: ${taviaTheme.colors.primary};
      }
    `;
  }}
`;

export const Styled = {
  CheckboxWrapper: StyledCheckboxWrapper,
  CheckboxRoot: StyledCheckboxRoot,
  CheckboxIndicator: StyledCheckboxIndicator,
  CheckboxLabel: StyledCheckboxLabel,
};
