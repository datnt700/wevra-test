'use client';

/**
 * Badge component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Badge.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

/**
 * Badge wrapper with interactive states
 */
export const WrapperStyled = styled.div<{
  $isClickable?: boolean;
  $hasUrl?: boolean;
}>`
  ${({ theme, $isClickable, $hasUrl }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      position: relative;
      display: flex;
      max-width: 100%;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 0.5rem;
      background-color: ${taviaTheme.colors.gray.light4};
      border-radius: ${taviaTheme.radii.md};
      color: ${taviaTheme.colors.text.primary};
      width: max-content;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1;
      transition: all 0.2s ease-in-out;
      cursor: ${$isClickable || $hasUrl ? 'pointer' : 'default'};

      ${
        $isClickable
          ? `
        &:hover {
          background-color: ${taviaTheme.colors.surfaceHover};
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        &:active {
          transform: translateY(0);
          box-shadow: none;
        }
      `
          : ''
      }

      ${
        $hasUrl
          ? `
        &:hover {
          background-color: ${taviaTheme.colors.surfaceHover};
          transform: translateY(-1px);

          a.body {
            text-decoration: underline;
          }
        }

        &:active {
          transform: translateY(0);
        }
      `
          : ''
      }
    `;
  }}
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
