'use client';

/**
 * @file FileUpload component styles
 * @description Emotion-based styles for the FileUpload component with drag-and-drop support
 */

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

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
  ${({ theme, $isActive = false }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      background: transparent;
      border-radius: ${taviaTheme.radii.md};
      border: 1px dashed ${taviaTheme.colors.text.secondary};
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
        border-color: ${taviaTheme.colors.primary} !important;
      `
          : ''
      }
    `;
  }}
`;

/**
 * Label for the file upload input
 */
const Label = styled.label`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      font-size: 1rem;
      color: ${taviaTheme.colors.text.primary};
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .errorMessage {
        color: ${taviaTheme.colors.primary};
        font-size: 1rem;
        font-weight: 600;
      }

      .title {
        color: ${taviaTheme.colors.text.primary};
        font-size: 1rem;
      }
    `;
  }}
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
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      color: ${taviaTheme.colors.border.default};
      font-size: 1rem;
      line-height: 1.625rem;
    `;
  }}
`;

/**
 * Highlighted text within the upload zone
 */
const Highlight = styled.span`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      font-weight: 700;
      color: ${taviaTheme.colors.primary};
    `;
  }}
`;

/**
 * Description text for the upload zone
 */
const Description = styled.p`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      font-size: 1rem;
      opacity: 0.5;
      color: ${taviaTheme.colors.text.primary};
    `;
  }}
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
