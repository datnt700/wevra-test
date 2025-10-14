import styled from '@emotion/styled';
import { Slider } from 'radix-ui';

/**
 * Styled components for the Slider.
 *
 * - `Root`: The container for the slider.
 * - `Track`: The background track of the slider.
 * - `Range`: The filled portion of the slider.
 * - `Thumb`: The draggable thumb of the slider.
 */
export const Styled = {
  Root: styled(Slider.Root)<{ $orientation?: 'horizontal' | 'vertical'; $disabled?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: ${({ $orientation }) => ($orientation === 'vertical' ? '20px' : '200px')};
    height: ${({ $orientation }) => ($orientation === 'vertical' ? '200px' : '20px')};
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ $disabled }) => ($disabled ? '0.5' : '1')};
  `,

  Track: styled(Slider.Track)<{ $orientation?: 'horizontal' | 'vertical' }>`
    background-color: var(--dark);
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
    height: ${({ $orientation }) => ($orientation === 'vertical' ? '100%' : '3px')};
    width: ${({ $orientation }) => ($orientation === 'vertical' ? '3px' : '100%')};
  `,

  Range: styled(Slider.Range)<{ $orientation?: 'horizontal' | 'vertical' }>`
    position: absolute;
    background-color: var(--light);
    border-radius: 9999px;
    height: ${({ $orientation }) => ($orientation === 'vertical' ? '100%' : '100%')};
    width: ${({ $orientation }) => ($orientation === 'vertical' ? '100%' : '100%')};
  `,

  Thumb: styled(Slider.Thumb)<{ $disabled?: boolean }>`
    display: block;
    width: 20px;
    height: 20px;
    background-color: var(--dark);
    border-radius: 50%;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: var(--main-color);
    }

    &:active {
      transform: scale(1.2);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--main-color-light-6);
    }

    ${({ $disabled }) =>
      $disabled &&
      `
      background-color: var(--neutral);
      cursor: not-allowed;
      pointer-events: none;
    `}
  `
};
