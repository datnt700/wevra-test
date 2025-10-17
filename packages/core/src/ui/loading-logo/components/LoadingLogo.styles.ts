/**
 * LoadingLogo Styles
 * Emotion-based styles for LoadingLogo component
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

/**
 * Logo color path element
 */
const LogoColor = styled.path`
  fill: ${cssVars.dark};
`;

/**
 * Exported styled components
 */
export const Styled = {
  logoColor: LogoColor,
};
