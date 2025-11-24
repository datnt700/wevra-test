/**
 * SocialButton component styles using @emotion/native
 * Specialized for auth buttons with left-aligned icons
 */
import styled from '@emotion/native';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

/**
 * Styled components for SocialButton
 */
export const Styled: {
  Button: ReturnType<typeof styled.TouchableOpacity>;
  Content: ReturnType<typeof styled.View>;
  IconContainer: ReturnType<typeof styled.View>;
  TextContainer: ReturnType<typeof styled.View>;
  Text: ReturnType<typeof styled.Text>;
} = {
  Button: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-width: 1px;
    overflow: hidden;
  `,

  Content: styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding-horizontal: ${spacing.base}px;
  `,

  IconContainer: styled.View`
    width: 24px;
    justify-content: center;
    align-items: center;
  `,

  TextContainer: styled.View`
    flex: 1;
    align-items: center;
    margin-left: -24px;
  `,

  Text: styled.Text`
    font-weight: ${typography.fontWeights.semibold};
    text-align: center;
  `,
};
