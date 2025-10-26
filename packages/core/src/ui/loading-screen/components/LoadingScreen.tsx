import { Styled } from './LoadingScreen.styles';
import { LoadingLogo } from '../../loading-logo';

/**
 * A full-screen loading component designed to display during application initialization.
 *
 * Features:
 * - Full viewport coverage with centered logo
 * - Animated LoadingLogo component
 * - Clean, minimal design suitable for app startup
 * - Styled using Emotion's `styled` API with theme tokens for modularity and reusability.
 *
 * Props: None - This is a static loading screen
 */
export const LoadingScreen = () => {
  return (
    <Styled.Container>
      <Styled.Main>
        <LoadingLogo width={168} height={168} />
      </Styled.Main>
    </Styled.Container>
  );
};

LoadingScreen.displayName = 'LoadingScreen';
