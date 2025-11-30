'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';
import type { CardVariant } from '../types';

interface WrapperProps {
  $variant?: CardVariant;
}

interface VariantStyles {
  backgroundColor: string;
  border: string;
  boxShadow: string;
}

const getVariantStyles = (theme: EventureTheme, variant: CardVariant): VariantStyles => {
  const variantMap: Record<CardVariant, VariantStyles> = {
    elevated: {
      backgroundColor: theme.colors.surface,
      border: 'none',
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    },
    outlined: {
      backgroundColor: theme.colors.surface,
      border: `1px solid ${theme.colors.border.default}`,
      boxShadow: 'none',
    },
    flat: {
      backgroundColor: theme.colors.surface,
      border: 'none',
      boxShadow: 'none',
    },
  };

  return variantMap[variant];
};

const StyledWrapper = styled.div<WrapperProps>`
  ${({ theme, $variant = 'elevated' }) => {
    const eventureTheme = theme as EventureTheme;
    const styles = getVariantStyles(eventureTheme, $variant);
    return `
      background-color: ${styles.backgroundColor};
      box-shadow: ${styles.boxShadow};
      border-radius: ${eventureTheme.radii.lg};
      border: ${styles.border};
      overflow: hidden;
    `;
  }}
`;

const StyledHeader = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      padding: 1rem 1.5rem;
      border-bottom: 1px solid ${eventureTheme.colors.border.default};
      font-weight: 600;
      color: ${eventureTheme.colors.text.primary};
    `;
  }}
`;

const StyledBody = styled.div`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      padding: 1.5rem;
      color: ${eventureTheme.colors.text.secondary};
    `;
  }}
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Header: StyledHeader,
  Body: StyledBody,
};
