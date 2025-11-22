'use client';

/**
 * Tabs styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Tabs.styles
 */
import styled from '@emotion/styled';
import { Tabs as RadixTabs } from 'radix-ui';
import type { TaviaTheme } from '../../../theme/theme';

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
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      flex-shrink: 0;
      display: flex;
      gap: 0.5rem;
      border-bottom: 1px solid ${taviaTheme.colors.gray.gray200};

      &[data-orientation='vertical'] {
        flex-direction: column;
        border-bottom: none;
        border-right: 1px solid ${taviaTheme.colors.gray.gray200};
      }
    `;
  }}
`;

/**
 * Individual tab trigger button
 */
const Trigger = styled(RadixTabs.Trigger)`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
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
      color: ${taviaTheme.colors.text.primary};
      user-select: none;
      border: 0;
      border-radius: ${taviaTheme.radii.sm} ${taviaTheme.radii.sm} 0 0;
      transition: all 0.2s ease;
      position: relative;

      &[data-orientation='vertical'] {
        border-radius: ${taviaTheme.radii.sm} 0 0 ${taviaTheme.radii.sm};
        justify-content: flex-start;
      }

      &:hover {
        cursor: pointer;
        color: ${taviaTheme.colors.primary};
        background-color: ${taviaTheme.colors.gray.gray100};
      }

      &[data-state='active'] {
        color: ${taviaTheme.colors.primary};
        border-bottom: 2px solid ${taviaTheme.colors.primary};

        &[data-orientation='vertical'] {
          border-bottom: none;
          border-right: 2px solid ${taviaTheme.colors.primary};
        }
      }

      &:focus-visible {
        outline: 2px solid ${taviaTheme.colors.primary};
        outline-offset: 2px;
        z-index: 1;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        color: ${taviaTheme.colors.border.default};

        &:hover {
          background-color: transparent;
          color: ${taviaTheme.colors.border.default};
        }
      }
    `;
  }}
`;

/**
 * Tab content panel
 */
const Content = styled(RadixTabs.Content)`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      flex-grow: 1;
      padding: 1.25rem;
      background-color: transparent;
      outline: none;
      color: ${taviaTheme.colors.text.primary};

      &:focus-visible {
        outline: 2px solid ${taviaTheme.colors.primary};
        outline-offset: 2px;
        border-radius: ${taviaTheme.radii.sm};
      }
    `;
  }}
`;

export const Styled = {
  Root,
  List,
  Trigger,
  Content,
};
