/**
 * TextInput component styles using @emotion/native
 * Aligned with @eventure/eventured styling patterns
 */
import styled from '@emotion/native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { radii } from '../../../theme/radii';

interface InputStyledProps {
  $hasError?: boolean;
  $isFocused?: boolean;
  $hasIcon?: boolean;
}

export const Styled: {
  Container: ReturnType<typeof styled.View>;
  Label: ReturnType<typeof styled.Text>;
  LabelRequired: ReturnType<typeof styled.Text>;
  InputContainer: ReturnType<typeof styled.View>;
  Input: ReturnType<typeof styled.TextInput<InputStyledProps>>;
  IconButton: ReturnType<typeof styled.TouchableOpacity>;
  ErrorText: ReturnType<typeof styled.Text>;
} = {
  Container: styled.View`
    margin-bottom: ${spacing.md + spacing.xs}px;
  `,

  Label: styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${colors.gray900};
    margin-bottom: ${spacing.sm}px;
  `,

  LabelRequired: styled.Text`
    color: ${colors.colorDanger};
  `,

  InputContainer: styled.View`
    position: relative;
  `,

  Input: styled.TextInput<InputStyledProps>`
    ${({ $hasError, $isFocused, $hasIcon }) => `
      height: 50px;
      border-width: 1px;
      border-radius: ${radii.md}px;
      padding-left: ${spacing.md}px;
      padding-right: ${$hasIcon ? 48 : spacing.md}px;
      font-size: 16px;
      background-color: ${colors.gray0};
      color: ${colors.gray900};
      border-color: ${
        $hasError ? colors.colorDanger : $isFocused ? colors.colorCyan : colors.gray200
      };
    `}
  `,

  IconButton: styled.TouchableOpacity`
    position: absolute;
    right: 12px;
    top: 0px;
    height: 50px;
    width: 40px;
    justify-content: center;
    align-items: center;
  `,

  ErrorText: styled.Text`
    font-size: 12px;
    color: ${colors.colorDanger};
    margin-top: ${spacing.xs}px;
  `,
};
