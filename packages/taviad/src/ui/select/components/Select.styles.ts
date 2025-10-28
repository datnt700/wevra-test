'use client';

/**
 * Select component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Select.styles
 */
import styled from '@emotion/styled';
import { Select } from 'radix-ui';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

const StyledRoot = styled(Select.Root)`
  /* Root container for the select */
`;

const StyledTrigger = styled(Select.Trigger, {
  shouldForwardProp: (prop: string) => !prop.startsWith('$'),
})<{ $isDisabled?: boolean; $isInvalid?: boolean }>`
  ${({ $isDisabled = false, $isInvalid = false }) => `
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    border-radius: ${radii.md};
    padding: 0 1rem;
    font-size: 0.875rem;
    line-height: 1;
    height: 3rem;
    gap: 0.5rem;
    background-color: ${$isDisabled ? cssVars.light4 : cssVars.light};
    border: 1px solid ${$isInvalid ? cssVars.colorDanger : cssVars.light5};
    min-width: 10rem;
    cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
    outline: none;
    transition: all 0.2s ease-in-out;
    color: ${cssVars.dark};

    &:hover:not(:disabled) {
      border-color: ${$isInvalid ? cssVars.colorDanger : cssVars.mainColor};
    }

    &[data-state='open'] {
      border-color: ${$isInvalid ? cssVars.colorDanger : cssVars.mainColor};
      box-shadow: 0 0 3px ${$isInvalid ? cssVars.colorDanger : cssVars.mainColor};
    }

    ${
      $isDisabled
        ? `
      opacity: 0.6;
      pointer-events: none;
    `
        : ''
    }
  `}
`;

const StyledValue = styled(Select.Value)`
  flex-grow: 1;
  color: ${cssVars.dark};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledIcon = styled(Select.Icon)`
  color: ${cssVars.dark};
  transition: transform 0.2s ease;

  &[data-state='open'] {
    transform: rotate(180deg);
  }
`;

const StyledPortal = styled(Select.Portal)`
  /* Portal container for the dropdown content */
`;

const StyledContent = styled(Select.Content)`
  overflow: hidden;
  background-color: ${cssVars.light};
  border-radius: ${radii.md};
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 1000;
`;

const StyledViewport = styled(Select.Viewport)`
  padding: 0.3125rem;
`;

const StyledSeparator = styled(Select.Separator)`
  height: 1px;
  background-color: ${cssVars.light4};
  margin: 0.3125rem 0;
`;

const StyledScrollUpButton = styled(Select.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  background-color: ${cssVars.light};
  color: ${cssVars.dark};
  cursor: default;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${cssVars.light3};
  }
`;

const StyledScrollDownButton = styled(Select.ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  background-color: ${cssVars.light};
  color: ${cssVars.dark};
  cursor: default;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${cssVars.light3};
  }
`;

const StyledItem = styled(Select.Item)`
  font-size: 0.875rem;
  line-height: 1;
  border-radius: ${radii.sm};
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 2.2rem 0 1.8rem;
  position: relative;
  user-select: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &[data-disabled] {
    pointer-events: none;
    color: ${cssVars.dark6};
    opacity: 0.6;
  }

  &[data-highlighted]:not([data-disabled]) {
    outline: none;
    background-color: ${cssVars.mainColorLight9};
  }

  &:hover:not([data-disabled]) {
    background-color: ${cssVars.light3};
  }

  &[data-state='checked'] {
    background-color: ${cssVars.mainColorLight9};
    font-weight: 500;
  }
`;

const StyledItemText = styled(Select.ItemText)`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${cssVars.dark};
`;

const StyledIndicator = styled(Select.SelectItemIndicator)`
  position: absolute;
  left: 0;
  width: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: ${cssVars.mainColor};
`;

export const Styled: any = {
  Root: StyledRoot,
  Trigger: StyledTrigger,
  Value: StyledValue,
  Icon: StyledIcon,
  Portal: StyledPortal,
  Content: StyledContent,
  Viewport: StyledViewport,
  Separator: StyledSeparator,
  ScrollUpButton: StyledScrollUpButton,
  ScrollDownButton: StyledScrollDownButton,
  Item: StyledItem,
  ItemText: StyledItemText,
  Indicator: StyledIndicator,
};
