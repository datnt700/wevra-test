/**
 * TaskItem Styles
 */

import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';

export const Styled = {
  TaskCard: styled.div<{ $completed: boolean }>`
    padding: 1rem 1.25rem;
    background: ${(props) => (props.theme as TaviaTheme).colors.background};
    border: 2px solid
      ${(props) => {
        const theme = props.theme as TaviaTheme;
        return props.$completed ? theme.colors.success : theme.colors.border.default;
      }};
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.2s ease;
    opacity: ${(props) => (props.$completed ? 0.7 : 1)};

    &:hover {
      border-color: ${(props) => {
        const theme = props.theme as TaviaTheme;
        return props.$completed ? theme.colors.success : theme.colors.border.hover;
      }};
    }
  `,
  Checkbox: styled.div<{ $completed: boolean }>`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid
      ${(props) =>
        props.$completed
          ? (props.theme as TaviaTheme).colors.success
          : (props.theme as TaviaTheme).colors.border.default};
    background: ${(props) =>
      props.$completed ? (props.theme as TaviaTheme).colors.success : 'transparent'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;

    &::after {
      content: ${(props) => (props.$completed ? '"✓"' : '""')};
      color: white;
      font-size: 0.875rem;
      font-weight: 700;
    }
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `,
  Title: styled.h5<{ $completed: boolean }>`
    font-size: 0.9375rem;
    font-weight: 600;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.primary};
    margin: 0;
    text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  `,
  Description: styled.p`
    font-size: 0.8125rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.secondary};
    margin: 0;
  `,
  Meta: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  `,
  XPBadge: styled.span`
    font-size: 0.75rem;
    font-weight: 700;
    color: ${(props) => (props.theme as TaviaTheme).colors.success};
    padding: 0.25rem 0.5rem;
    background: ${(props) => (props.theme as TaviaTheme).colors.successLight}20;
    border-radius: 4px;
  `,
  TypeBadge: styled.span`
    font-size: 0.75rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.secondary};
    padding: 0.25rem 0.5rem;
    background: ${(props) => (props.theme as TaviaTheme).colors.surface};
    border-radius: 4px;
    text-transform: capitalize;
  `,
};
