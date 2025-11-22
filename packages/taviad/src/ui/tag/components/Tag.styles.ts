'use client';

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

interface WrapperProps {
  $canClick?: boolean;
  $withUrl?: boolean;
}

const StyledWrapper = styled.div<WrapperProps>`
  ${({ theme, $canClick, $withUrl }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      position: relative;
      display: flex;
      max-width: 100%;
      align-items: center;
      padding: 0.125rem 0.375rem;
      background-color: ${taviaTheme.colors.surfaceHover};
      border-radius: ${taviaTheme.radii.md};
      color: ${taviaTheme.colors.text.primary};
      width: max-content;
      transition: background-color 0.3s ease;

      ${
        $canClick || $withUrl
          ? `
        cursor: pointer;

        &:hover {
          background-color: ${taviaTheme.colors.gray.gray200};
        }
      `
          : ''
      }

      ${
        $withUrl
          ? `
        .body {
          color: inherit;
        }

        &:hover .body {
          text-decoration: underline;
        }
      `
          : ''
      }
    `;
  }}
`;

const StyledBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledCloseIcon = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: ${taviaTheme.colors.text.tertiary};
      }
    `;
  }}
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Body: StyledBody,
  CloseIcon: StyledCloseIcon,
};
