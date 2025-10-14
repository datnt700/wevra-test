import styled from '@emotion/styled';

export const Styled = {
  self: styled.div<{
    height?: string;
    maxHeight?: string;
    scrollbarWidth?: 'auto' | 'none' | 'thin';
    hasTopShadow?: boolean;
    hasBottomShadow?: boolean;
  }>`
    overflow-y: auto;
    overflow-x: auto;
    scrollbar-width: ${({ scrollbarWidth }) => scrollbarWidth || 'auto'};

    &::before,
    &::after {
      content: '';
      position: sticky;
      left: 0;
      display: block;
      pointer-events: none;
      height: 0rem;
      width: 100%;
      z-index: 32;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }
  `,
};
