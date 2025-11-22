'use client';

/**
 * Field styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Field.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

type FieldType = 'column' | 'row';

interface WrapperProps {
  $type?: FieldType;
}

/**
 * Wrapper container for field (label + input)
 */
const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${({ $type = 'column' }) => ($type === 'row' ? 'row' : 'column')};
  gap: 0.5rem;
  align-items: ${({ $type = 'column' }) => ($type === 'row' ? 'center' : 'flex-start')};
  width: 100%;
`;

/**
 * Label element
 */
const Label = styled.label`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      width: 100%;
      font-size: 0.875rem;
      line-height: 1.25;
      color: ${taviaTheme.colors.text.primary};
      font-weight: 500;
      display: block;
    `;
  }}
`;

/**
 * Input container
 */
const Input = styled.div`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      width: 100%;
      border-radius: ${taviaTheme.radii.sm};
      color: ${taviaTheme.colors.text.primary};
      font-size: 1rem;
      line-height: 1.5;

      /* Ensure child inputs take full width */
      & > input,
      & > textarea,
      & > select {
        width: 100%;
      }
    `;
  }}
`;

export const Styled = {
  Wrapper,
  Label,
  Input,
};
