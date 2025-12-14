'use client';

/**
 * Quiz Analyzing Screen (Duolingo-style)
 * Full-screen loading state with Duo mascot
 */

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';

export function QuizAnalyzing() {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'Analyzing your responses...',
    'Understanding your financial profile...',
    'Creating your personalized roadmap...',
  ];

  useEffect(() => {
    if (messageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setMessageIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messageIndex, messages.length]);

  return (
    <Styled.Container>
      {/* Duo Mascot */}
      <Styled.DuoContainer>
        <Styled.DuoAvatar>🦉</Styled.DuoAvatar>
        <Styled.SpeechBubble>{messages[messageIndex]}</Styled.SpeechBubble>
      </Styled.DuoContainer>

      {/* Loading Dots */}
      <Styled.LoadingDots>
        <Styled.Dot $delay={0} />
        <Styled.Dot $delay={0.2} />
        <Styled.Dot $delay={0.4} />
      </Styled.LoadingDots>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    position: fixed;
    inset: 0;
    background: ${(props) => (props.theme as EventureTheme).colors.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    z-index: 9999;
  `,

  DuoContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  DuoAvatar: styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${(props) => (props.theme as EventureTheme).colors.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: bounce 2s ease-in-out infinite;

    @keyframes bounce {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  `,

  SpeechBubble: styled.div`
    background: ${(props) => (props.theme as EventureTheme).colors.surface};
    padding: 1.25rem 2rem;
    border-radius: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
    text-align: center;
    max-width: 400px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: messageChange 0.5s ease-out;

    /* Speech bubble tail */
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid white;
    }

    @keyframes messageChange {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,

  LoadingDots: styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
  `,

  Dot: styled.span<{ $delay: number }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) => (props.theme as EventureTheme).colors.primary};
    animation: pulse 1.4s ease-in-out infinite;
    animation-delay: ${(props) => props.$delay}s;

    @keyframes pulse {
      0%,
      60%,
      100% {
        transform: scale(1);
        opacity: 0.7;
      }
      30% {
        transform: scale(1.3);
        opacity: 1;
      }
    }
  `,
};
