'use client';

/**
 * Field styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Field.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

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
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.25;
  color: ${cssVars.dark};
  font-weight: 500;
  display: block;
`;

/**
 * Input container
 */
const Input = styled.div`
  width: 100%;
  border-radius: ${radii.sm};
  color: ${cssVars.dark};
  font-size: 1rem;
  line-height: 1.5;

  /* Ensure child inputs take full width */
  & > input,
  & > textarea,
  & > select {
    width: 100%;
  }
`;

export const Styled = {
  Wrapper,
  Label,
  Input,
};
