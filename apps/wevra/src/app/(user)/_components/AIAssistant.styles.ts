import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';

export const Styled = {
  AssistantContainer: styled.div<{ $isOpen: boolean }>`
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: ${(props) => (props.$isOpen ? '400px' : '0')};
    background-color: ${(props) => (props.theme as EventureTheme).colors.surface};
    border-left: ${(props) =>
      props.$isOpen ? `1px solid ${(props.theme as EventureTheme).colors.border.default}` : 'none'};
    transition: width 0.3s ease;
    overflow: hidden;
    z-index: 1000;
    display: flex;
    flex-direction: column;
  `,

  ToggleButton: styled.button<{ $isOpen: boolean }>`
    position: fixed;
    right: ${(props) => (props.$isOpen ? '400px' : '0')};
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    background: ${(props) => (props.theme as EventureTheme).colors.primary};
    border: none;
    border-radius: ${(props) => (props.$isOpen ? '0.75rem 0 0 0.75rem' : '0.75rem 0 0 0.75rem')};
    color: ${(props) => (props.theme as EventureTheme).colors.text.inverse};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 1001;

    &:hover {
      background: ${(props) => (props.theme as EventureTheme).colors.primaryHover};
      box-shadow: -2px 2px 12px rgba(0, 0, 0, 0.25);
    }

    svg {
      width: 24px;
      height: 24px;
    }
  `,

  Header: styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props) => (props.theme as EventureTheme).colors.primary};
    color: ${(props) => (props.theme as EventureTheme).colors.text.inverse};
  `,

  HeaderTitle: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;

    svg {
      width: 24px;
      height: 24px;
    }
  `,

  CloseButton: styled.button`
    background: transparent;
    border: none;
    color: ${(props) => (props.theme as EventureTheme).colors.text.inverse};
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${(props) => (props.theme as EventureTheme).colors.primaryHover};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  `,

  WelcomeSection: styled.div`
    padding: 2rem 1.5rem;
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  `,

  WelcomeIcon: styled.div`
    font-size: 4rem;
  `,

  WelcomeTitle: styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
    margin: 0;
  `,

  WelcomeText: styled.p`
    font-size: 0.9375rem;
    color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
    line-height: 1.6;
    margin: 0;
    max-width: 280px;
  `,

  QuickActions: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 320px;
  `,

  QuickActionButton: styled.button`
    padding: 1rem;
    background-color: ${(props) => (props.theme as EventureTheme).colors.background};
    border: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
    border-radius: 0.75rem;
    color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;

    &:hover {
      border-color: ${(props) => (props.theme as EventureTheme).colors.primary};
      background-color: ${(props) => (props.theme as EventureTheme).colors.gray.mainColorLight}10;
    }
  `,

  ChatContainer: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  Message: styled.div<{ $isUser?: boolean }>`
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    justify-content: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  `,

  MessageBubble: styled.div<{ $isUser?: boolean }>`
    padding: 0.875rem 1.125rem;
    border-radius: 1rem;
    max-width: 75%;
    background-color: ${(props) =>
      props.$isUser
        ? (props.theme as EventureTheme).colors.primary
        : (props.theme as EventureTheme).colors.background};
    color: ${(props) =>
      props.$isUser
        ? (props.theme as EventureTheme).colors.text.inverse
        : (props.theme as EventureTheme).colors.text.primary};
    font-size: 0.9375rem;
    line-height: 1.5;
    word-wrap: break-word;
  `,

  InputContainer: styled.div`
    padding: 1.5rem;
    border-top: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
  `,

  Input: styled.textarea`
    flex: 1;
    padding: 0.875rem 1rem;
    border: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
    border-radius: 0.75rem;
    background-color: ${(props) => (props.theme as EventureTheme).colors.background};
    color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
    font-size: 0.9375rem;
    font-family: inherit;
    resize: none;
    min-height: 44px;
    max-height: 120px;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${(props) => (props.theme as EventureTheme).colors.primary};
    }

    &::placeholder {
      color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
    }
  `,

  SendButton: styled.button`
    padding: 0.875rem;
    background: ${(props) => (props.theme as EventureTheme).colors.primary};
    border: none;
    border-radius: 0.75rem;
    color: ${(props) => (props.theme as EventureTheme).colors.text.inverse};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: ${(props) => (props.theme as EventureTheme).colors.primaryHover};
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  `,
};
