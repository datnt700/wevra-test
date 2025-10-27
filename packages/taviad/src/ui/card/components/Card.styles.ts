'use client';

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';
import type { CardVariant } from '../types';

interface WrapperProps {
  $variant?: CardVariant;
}

interface VariantStyles {
  backgroundColor: string;
  border: string;
  boxShadow: string;
}

const getVariantStyles = (variant: CardVariant): VariantStyles => {
  const variantMap: Record<CardVariant, VariantStyles> = {
    elevated: {
      backgroundColor: cssVars.light,
      border: 'none',
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    },
    outlined: {
      backgroundColor: cssVars.light,
      border: `1px solid ${cssVars.light4}`,
      boxShadow: 'none',
    },
    flat: {
      backgroundColor: cssVars.light,
      border: 'none',
      boxShadow: 'none',
    },
  };

  return variantMap[variant];
};

const StyledWrapper = styled.div<WrapperProps>`
  ${({ $variant = 'elevated' }) => {
    const styles = getVariantStyles($variant);
    return `
      background-color: ${styles.backgroundColor};
      box-shadow: ${styles.boxShadow};
      border-radius: ${radii.lg};
      border: ${styles.border};
      overflow: hidden;
    `;
  }}
`;

const StyledHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${cssVars.light4};
  font-weight: 600;
  color: ${cssVars.dark};
`;

const StyledBody = styled.div`
  padding: 1.5rem;
  color: ${cssVars.dark2};
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Header: StyledHeader,
  Body: StyledBody,
};
