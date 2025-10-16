import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
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
      backgroundColor: cssVars.gray0,
      border: 'none',
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    },
    outlined: {
      backgroundColor: cssVars.gray0,
      border: `1px solid ${cssVars.gray300}`,
      boxShadow: 'none',
    },
    flat: {
      backgroundColor: cssVars.gray0,
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
      border-radius: 0.75rem;
      border: ${styles.border};
      overflow: hidden;
    `;
  }}
`;

const StyledHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${cssVars.gray200};
  font-weight: 600;
  color: ${cssVars.gray900};
`;

const StyledBody = styled.div`
  padding: 1.5rem;
  color: ${cssVars.gray800};
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Header: StyledHeader,
  Body: StyledBody,
};
