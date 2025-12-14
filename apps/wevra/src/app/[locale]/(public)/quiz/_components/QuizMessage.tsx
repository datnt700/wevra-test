'use client';

/**
 * Chat Message Component
 * Individual message bubble in the chat interface
 */

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';

interface ChatMessage {
  id: string;
  type: 'duo' | 'user';
  content: string;
  timestamp: Date;
  questionId?: string;
}

interface QuizChatMessageProps {
  message: ChatMessage;
  delay?: number;
}

export function QuizMessage({ message, delay = 0 }: QuizChatMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (message.type === 'duo') {
    return (
      <Styled.DuoMessageWrapper $isVisible={isVisible}>
        <Styled.DuoAvatar>🦉</Styled.DuoAvatar>
        <Styled.DuoBubble>{message.content}</Styled.DuoBubble>
      </Styled.DuoMessageWrapper>
    );
  }

  return (
    <Styled.UserMessageWrapper $isVisible={isVisible}>
      <Styled.UserBubble>{message.content}</Styled.UserBubble>
    </Styled.UserMessageWrapper>
  );
}

const Styled = {
  DuoMessageWrapper: styled.div<{ $isVisible: boolean }>`
    display: flex;
    align-items: flex-end;
    gap: 0.75rem;
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    transform: translateY(${(props) => (props.$isVisible ? 0 : '10px')});
    transition:
      opacity 0.3s ease-out,
      transform 0.3s ease-out;
  `,

  DuoAvatar: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${(props) => (props.theme as EventureTheme).colors.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  `,

  DuoBubble: styled.div`
    background: ${(props) => (props.theme as EventureTheme).colors.background};
    padding: 1rem 1.25rem;
    border-radius: 1.25rem 1.25rem 1.25rem 0.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    max-width: 85%;
    color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
    font-size: 1rem;
    line-height: 1.5;
  `,

  UserMessageWrapper: styled.div<{ $isVisible: boolean }>`
    display: flex;
    justify-content: flex-end;
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    transform: translateY(${(props) => (props.$isVisible ? 0 : '10px')});
    transition:
      opacity 0.3s ease-out,
      transform 0.3s ease-out;
  `,

  UserBubble: styled.div`
    background: ${(props) => (props.theme as EventureTheme).colors.primary};
    color: white;
    padding: 1rem 1.25rem;
    border-radius: 1.25rem 1.25rem 0.25rem 1.25rem;
    max-width: 85%;
    font-size: 1rem;
    line-height: 1.5;
    box-shadow: 0 2px 8px ${(props) => (props.theme as EventureTheme).colors.primary}30;
  `,
};
