/**
 * @file ImageUpload component styles
 * @description Emotion-based styles for the ImageUpload component with drag-and-drop and preview support
 */

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Props for styled Wrapper component
 */
interface WrapperProps {
  /** Whether the drag zone is currently active (image being dragged over) */
  $isActive?: boolean;
}

/**
 * Hidden input element for image file selection
 */
const InputUpload = styled.input`
  display: none;
`;

/**
 * Wrapper for the drag-and-drop upload zone
 * Handles active state when images are dragged over
 */
const Wrapper = styled.label<WrapperProps>`
  ${({ $isActive = false }) => `
    background: transparent;
    border-radius: ${radii.md};
    border: 1px dashed ${cssVars.dark};
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 16rem;
    cursor: pointer;

    ${
      $isActive
        ? `
      border-color: ${cssVars.mainColor};
    `
        : ''
    }

    &:focus-within {
      border-color: ${cssVars.mainColor};
      box-shadow: 0 0 3px ${cssVars.mainColor};
    }
  `}
`;

/**
 * Preview image displayed when an image is uploaded
 */
const Preview = styled.img`
  width: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  object-fit: cover;
`;

/**
 * Content wrapper for the upload zone elements
 */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 2;

  p {
    color: ${cssVars.dark};
    opacity: 0.8;
  }
`;

export const Styled = {
  InputUpload,
  Wrapper,
  Preview,
  Content,
};
