'use client';

import styled from '@emotion/styled';
import { SPACING_VALUES } from '../../../lib/constants/SpacingValues';
import type { StackDirection, StackAlign, StackJustify, StackSpacing } from '../types';

interface StyledProps {
  $direction?: StackDirection;
  $spacing?: StackSpacing;
  $align?: StackAlign;
  $justify?: StackJustify;
  $wrap?: boolean;
}

const getAlignValue = (align: StackAlign): string => {
  const alignMap: Record<StackAlign, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  };
  return alignMap[align];
};

const getJustifyValue = (justify: StackJustify): string => {
  const justifyMap: Record<StackJustify, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };
  return justifyMap[justify];
};

const getSpacingValue = (spacing: StackSpacing): string => {
  return SPACING_VALUES[spacing];
};

const StyledStack = styled.div<StyledProps>`
  display: flex;
  flex-direction: ${({ $direction = 'column' }) => $direction};
  align-items: ${({ $align = 'stretch' }) => getAlignValue($align)};
  justify-content: ${({ $justify = 'start' }) => getJustifyValue($justify)};
  gap: ${({ $spacing = 'md' }) => getSpacingValue($spacing)};
  flex-wrap: ${({ $wrap = false }) => ($wrap ? 'wrap' : 'nowrap')};
`;

/**
 * Styled components for Stack
 */
export const Styled = {
  Stack: StyledStack,
};
