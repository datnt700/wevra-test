'use client';

/**
 * LoadingLogo Styles
 * Emotion-based styles for LoadingLogo component
 */
import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';

/**
 * Logo color path element
 */
const LogoColor = styled.path`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      fill: ${eventureTheme.colors.text.primary};
    `;
  }}
`;

/**
 * Exported styled components
 */
export const Styled = {
  logoColor: LogoColor,
};
