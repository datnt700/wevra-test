'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

type Size = 'sm' | 'lg' | 'xxl';

export const sizes = {
  sm: {
    size: '2rem',
    borderSize: '0.25rem',
  },
  lg: {
    size: '4rem',
    borderSize: '0.375rem',
  },
  xxl: {
    size: '8rem',
    borderSize: '0.5rem',
  },
};

export const SpinnerStyled = styled.div<{ size: Size }>`
  ${({ theme, size }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      width: ${sizes[size].size};
      height: ${sizes[size].size};
      border: ${sizes[size].borderSize} solid ${eventureTheme.colors.gray.gray200};
      border-top-color: ${eventureTheme.colors.primary};
      border-radius: ${eventureTheme.radii.full};
      animation: spin 1s linear infinite;

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }}
`;
