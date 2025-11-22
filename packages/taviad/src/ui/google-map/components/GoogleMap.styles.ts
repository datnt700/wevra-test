'use client';

/**
 * GoogleMap component styles using Emotion
 * @module GoogleMap.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

export const Styled = {
  Wrapper: styled.div<{ $height?: string | number; $width?: string | number }>`
    ${({ theme, $height, $width }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        width: ${typeof $width === 'number' ? `${$width}px` : $width || '100%'};
        height: ${typeof $height === 'number' ? `${$height}px` : $height || '600px'};
        border-radius: ${taviaTheme.radii.lg};
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        position: relative;

        /* Ensure map fills container */
        > div {
          width: 100% !important;
          height: 100% !important;
        }
      `;
    }}
  `,

  Marker: styled.div<{ $isAvailable?: boolean }>`
    ${({ theme, $isAvailable }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        background-color: ${$isAvailable ? taviaTheme.colors.success : taviaTheme.colors.danger};
        color: ${taviaTheme.colors.surface};
        border-radius: ${taviaTheme.radii.md};
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        white-space: nowrap;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }
      `;
    }}
  `,

  ErrorMessage: styled.div`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: ${taviaTheme.colors.surfaceHover};
        color: ${taviaTheme.colors.danger};
        font-size: 0.875rem;
        border-radius: ${taviaTheme.radii.lg};
        padding: 1rem;
      `;
    }}
  `,
};
