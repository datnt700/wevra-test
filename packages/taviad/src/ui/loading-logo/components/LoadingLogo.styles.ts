'use client';

/**
 * LoadingLogo Styles
 * Emotion-based styles for LoadingLogo component
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

/**
 * Logo color path element
 */
const LogoColor = styled.path`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      fill: ${taviaTheme.colors.text.primary};
    `;
  }}
`;

/**
 * Exported styled components
 */
export const Styled = {
  logoColor: LogoColor,
};
