/**
 * Tabs styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Tabs.styles
 */
import styled from '@emotion/styled';
import { Tabs as RadixTabs } from 'radix-ui';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Root container for tabs
 */
const Root = styled(RadixTabs.Root)`
  display: flex;
  flex-direction: column;

  &[data-orientation='vertical'] {
    flex-direction: row;
  }
`;

/**
 * Tab list container
 */
const List = styled(RadixTabs.List)`
  flex-shrink: 0;
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid ${cssVars.light4};

  &[data-orientation='vertical'] {
    flex-direction: column;
    border-bottom: none;
    border-right: 1px solid ${cssVars.light4};
  }
`;

/**
 * Individual tab trigger button
 */
const Trigger = styled(RadixTabs.Trigger)`
  font-family: inherit;
  background-color: transparent;
  padding: 0 1.25rem;
  height: 3rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  line-height: 1;
  color: ${cssVars.dark};
  user-select: none;
  border: 0;
  border-radius: ${radii.sm} ${radii.sm} 0 0;
  transition: all 0.2s ease;
  position: relative;

  &[data-orientation='vertical'] {
    border-radius: ${radii.sm} 0 0 ${radii.sm};
    justify-content: flex-start;
  }

  &:hover {
    cursor: pointer;
    color: ${cssVars.mainColor};
    background-color: ${cssVars.light2};
  }

  &[data-state='active'] {
    color: ${cssVars.mainColor};
    border-bottom: 2px solid ${cssVars.mainColor};

    &[data-orientation='vertical'] {
      border-bottom: none;
      border-right: 2px solid ${cssVars.mainColor};
    }
  }

  &:focus-visible {
    outline: 2px solid ${cssVars.mainColor};
    outline-offset: 2px;
    z-index: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    color: ${cssVars.light6};

    &:hover {
      background-color: transparent;
      color: ${cssVars.light6};
    }
  }
`;

/**
 * Tab content panel
 */
const Content = styled(RadixTabs.Content)`
  flex-grow: 1;
  padding: 1.25rem;
  background-color: transparent;
  outline: none;
  color: ${cssVars.dark};

  &:focus-visible {
    outline: 2px solid ${cssVars.mainColor};
    outline-offset: 2px;
    border-radius: ${radii.sm};
  }
`;

export const Styled = {
  Root,
  List,
  Trigger,
  Content,
};
