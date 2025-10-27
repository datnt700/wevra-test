'use client';

/**
 * GoogleMap component styles using Emotion
 * @module GoogleMap.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

export const Styled = {
  Wrapper: styled.div<{ $height?: string | number; $width?: string | number }>`
    width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
    height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height || '600px')};
    border-radius: ${radii.lg};
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;

    /* Ensure map fills container */
    > div {
      width: 100% !important;
      height: 100% !important;
    }
  `,

  Marker: styled.div<{ $isAvailable?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    background-color: ${({ $isAvailable }) =>
      $isAvailable ? cssVars.colorSuccess : cssVars.colorDanger};
    color: ${cssVars.light};
    border-radius: ${radii.md};
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
  `,

  ErrorMessage: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${cssVars.light3};
    color: ${cssVars.colorDanger};
    font-size: 0.875rem;
    border-radius: ${radii.lg};
    padding: 1rem;
  `,
};
