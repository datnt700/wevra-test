'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Styled = {
  Container: styled.div<{ $arrowPosition: 'inside' | 'outside' }>`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: ${({ $arrowPosition }) => ($arrowPosition === 'outside' ? '0 48px' : '0')};
  `,

  Viewport: styled.div`
    position: relative;
    overflow: hidden;
    border-radius: ${radii.md};
  `,

  Track: styled.div<{ $currentIndex: number; $gap: number; $slidesToShow: number }>`
    display: flex;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    gap: ${({ $gap }) => $gap}px;
    transform: translateX(
      calc(
        -${({ $currentIndex }) => $currentIndex} *
          (${({ $slidesToShow }) => 100 / $slidesToShow}% + ${({ $gap }) => $gap}px)
      )
    );
  `,

  Slide: styled.div<{ $slidesToShow: number; $gap: number }>`
    flex: 0 0
      calc(
        ${({ $slidesToShow }) => 100 / $slidesToShow}% -
          ${({ $gap, $slidesToShow }) => ($gap * ($slidesToShow - 1)) / $slidesToShow}px
      );
    min-width: 0;
    animation: ${slideIn} 0.3s ease;

    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: ${radii.md};
    }
  `,

  Arrow: styled.button<{
    $position: 'left' | 'right';
    $arrowPosition: 'inside' | 'outside';
    $size: 'sm' | 'md' | 'lg';
  }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${({ $position, $arrowPosition }) =>
      $position === 'left'
        ? $arrowPosition === 'inside'
          ? 'left: 12px;'
          : 'left: 0;'
        : $arrowPosition === 'inside'
          ? 'right: 12px;'
          : 'right: 0;'}
    z-index: 10;

    width: ${({ $size }) => ($size === 'sm' ? '32px' : $size === 'lg' ? '48px' : '40px')};
    height: ${({ $size }) => ($size === 'sm' ? '32px' : $size === 'lg' ? '48px' : '40px')};
    border-radius: ${radii.full};
    border: none;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.1),
      0 1px 4px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    svg {
      width: ${({ $size }) => ($size === 'sm' ? '16px' : $size === 'lg' ? '24px' : '20px')};
      height: ${({ $size }) => ($size === 'sm' ? '16px' : $size === 'lg' ? '24px' : '20px')};
      color: ${cssVars.gray900};
    }

    &:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 1);
      transform: translateY(-50%) scale(1.05);
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.15),
        0 2px 6px rgba(0, 0, 0, 0.1);
    }

    &:active:not(:disabled) {
      transform: translateY(-50%) scale(0.98);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid ${cssVars.mainColor};
      outline-offset: 2px;
    }
  `,

  DotsContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  `,

  Dot: styled.button<{ $active: boolean }>`
    width: ${({ $active }) => ($active ? '24px' : '8px')};
    height: 8px;
    border-radius: ${radii.full};
    border: none;
    background-color: ${({ $active }) => ($active ? cssVars.mainColor : cssVars.gray300)};
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;

    &:hover {
      background-color: ${({ $active }) => ($active ? cssVars.mainColor : cssVars.gray400)};
    }

    &:focus-visible {
      outline: 2px solid ${cssVars.mainColor};
      outline-offset: 2px;
    }
  `,
};
