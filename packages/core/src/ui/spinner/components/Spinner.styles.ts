'use client';

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

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
  ${({ size }) => `
    width: ${sizes[size].size};
    height: ${sizes[size].size};
    border: ${sizes[size].borderSize} solid ${cssVars.gray200};
    border-top-color: ${cssVars.mainColor};
  `}
  border-radius: ${radii.full};
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
