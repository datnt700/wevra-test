/**
 * Badge component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Badge.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { styleVars } from '../../../theme/tokens/variables';

/**
 * Badge wrapper with interactive states
 */
export const WrapperStyled = styled.div<{
  $isClickable?: boolean;
  $hasUrl?: boolean;
}>`
  position: relative;
  display: flex;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  background-color: ${cssVars.gray200};
  border-radius: ${styleVars.borderRadiusMedium};
  color: ${cssVars.dark};
  width: max-content;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  transition: all 0.2s ease-in-out;
  cursor: ${({ $isClickable, $hasUrl }) => ($isClickable || $hasUrl ? 'pointer' : 'default')};

  ${({ $isClickable }) =>
    $isClickable &&
    `
    &:hover {
      background-color: ${cssVars.gray300};
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
  `}

  ${({ $hasUrl }) =>
    $hasUrl &&
    `
    &:hover {
      background-color: ${cssVars.gray300};
      transform: translateY(-1px);

      a.body {
        text-decoration: underline;
      }
    }

    &:active {
      transform: translateY(0);
    }
  `}
`;

/**
 * Badge body container
 */
export const BodyStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

/**
 * Badge content wrapper
 */
export const ContentStyled = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;
