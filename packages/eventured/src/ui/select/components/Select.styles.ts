'use client';

/**
 * Select component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Select.styles
 */
import styled from '@emotion/styled';
import { Select } from 'radix-ui';
import type { EventureTheme } from '../../../theme/theme';

const StyledRoot = styled(Select.Root)`
  /* Root container for the select */
`;

const StyledTrigger = styled(Select.Trigger, {
  shouldForwardProp: (prop: string) => !prop.startsWith('$'),
})<{ theme?: EventureTheme; $isDisabled?: boolean; $isInvalid?: boolean }>`
  ${({ theme, $isDisabled = false, $isInvalid = false }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${eventureTheme.radii.md};
      padding: 0 1rem;
      font-size: 0.875rem;
      line-height: 1;
      height: 3rem;
      gap: 0.5rem;
      background-color: ${$isDisabled ? eventureTheme.colors.surfaceHover : eventureTheme.colors.surface};
      border: 1px solid ${$isInvalid ? eventureTheme.colors.danger : eventureTheme.colors.border.default};
      min-width: 10rem;
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
      outline: none;
      transition: all 0.2s ease-in-out;
      color: ${eventureTheme.colors.text.primary};

      &:hover:not(:disabled) {
        border-color: ${$isInvalid ? eventureTheme.colors.danger : eventureTheme.colors.primary};
      }

      &[data-state='open'] {
        border-color: ${$isInvalid ? eventureTheme.colors.danger : eventureTheme.colors.primary};
        box-shadow: 0 0 3px ${$isInvalid ? eventureTheme.colors.danger : eventureTheme.colors.primary};
      }

      ${
        $isDisabled
          ? `
        opacity: 0.6;
        pointer-events: none;
      `
          : ''
      }
    `;
  }}
`;

const StyledValue = styled(Select.Value)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      flex-grow: 1;
      color: ${eventureTheme.colors.text.primary};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  }}
`;

const StyledIcon = styled(Select.Icon)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      color: ${eventureTheme.colors.text.primary};
      transition: transform 0.2s ease;

      &[data-state='open'] {
        transform: rotate(180deg);
      }
    `;
  }}
`;

const StyledPortal = styled(Select.Portal)`
  /* Portal container for the dropdown content */
`;

const StyledContent = styled(Select.Content)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      overflow: hidden;
      background-color: ${eventureTheme.colors.surface};
      border-radius: ${eventureTheme.radii.md};
      box-shadow:
        0px 10px 38px -10px rgba(22, 23, 24, 0.35),
        0px 10px 20px -15px rgba(22, 23, 24, 0.2);
      z-index: 1000;
    `;
  }}
`;

const StyledViewport = styled(Select.Viewport)`
  padding: 0.3125rem;
`;

const StyledSeparator = styled(Select.Separator)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      height: 1px;
      background-color: ${eventureTheme.colors.border.default};
      margin: 0.3125rem 0;
    `;
  }}
`;

const StyledScrollUpButton = styled(Select.ScrollUpButton)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.8rem;
      background-color: ${eventureTheme.colors.surface};
      color: ${eventureTheme.colors.text.primary};
      cursor: default;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${eventureTheme.colors.surfaceHover};
      }
    `;
  }}
`;

const StyledScrollDownButton = styled(Select.ScrollDownButton)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.8rem;
      background-color: ${eventureTheme.colors.surface};
      color: ${eventureTheme.colors.text.primary};
      cursor: default;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${eventureTheme.colors.surfaceHover};
      }
    `;
  }}
`;

const StyledItem = styled(Select.Item)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      font-size: 0.875rem;
      line-height: 1;
      color: ${eventureTheme.colors.text.primary};
      border-radius: ${eventureTheme.radii.sm};
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
        color: ${eventureTheme.colors.text.disabled};
        opacity: 0.6;
      }

      &[data-highlighted]:not([data-disabled]) {
        outline: none;
        background-color: ${eventureTheme.colors.surfaceHover};
      }

      &:hover:not([data-disabled]) {
        background-color: ${eventureTheme.colors.surfaceHover};
      }

      &[data-state='checked'] {
        background-color: ${eventureTheme.colors.surfaceHover};
        font-weight: 500;
      }
    `;
  }}
`;

const StyledItemText = styled(Select.ItemText)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: ${eventureTheme.colors.text.primary};
    `;
  }}
`;

const StyledIndicator = styled(Select.SelectItemIndicator)<{ theme?: EventureTheme }>`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      position: absolute;
      left: 0;
      width: 2rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      color: ${eventureTheme.colors.primary};
    `;
  }}
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
