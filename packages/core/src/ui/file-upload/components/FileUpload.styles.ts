/**
 * @file FileUpload component styles
 * @description Emotion-based styles for the FileUpload component with drag-and-drop support
 */

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Props for styled Wrapper component
 */
interface WrapperProps {
  /** Whether the drag zone is currently active (file being dragged over) */
  $isActive?: boolean;
}

/**
 * Hidden input element for file selection
 */
const InputUpload = styled.input`
  display: none;
`;

/**
 * Wrapper for the drag-and-drop upload zone
 * Handles active state when files are dragged over
 */
const Wrapper = styled.div<WrapperProps>`
  ${({ $isActive = false }) => `
    background: transparent;
    border-radius: ${radii.md};
    border: 1px dashed ${cssVars.dark3};
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    padding: 1rem 2rem;
    width: 100%;

    ${
      $isActive
        ? `
      border-color: ${cssVars.mainColor} !important;
    `
        : ''
    }
  `}
`;

/**
 * Label for the file upload input
 */
const Label = styled.label`
  font-size: 1rem;
  color: ${cssVars.dark};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .errorMessage {
    color: ${cssVars.mainColor};
    font-size: 1rem;
    font-weight: 600;
  }

  .title {
    color: ${cssVars.dark};
    font-size: 1rem;
  }
`;

/**
 * Content wrapper for the upload zone elements
 */
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  z-index: 2;
`;

/**
 * Wrapper for title and icon
 */
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

/**
 * Title text for the upload zone
 */
const Title = styled.h2`
  color: ${cssVars.dark4};
  font-size: 1rem;
  line-height: 1.625rem;
`;

/**
 * Highlighted text within the upload zone
 */
const Highlight = styled.span`
  font-weight: 700;
  color: ${cssVars.mainColor};
`;

/**
 * Description text for the upload zone
 */
const Description = styled.p`
  font-size: 1rem;
  opacity: 0.5;
  color: ${cssVars.dark};
`;

export const Styled = {
  InputUpload,
  Wrapper,
  Label,
  Content,
  TitleWrapper,
  Title,
  Highlight,
  Description,
};
