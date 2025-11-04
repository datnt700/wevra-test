import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';

/**
 * Chat-based Quiz Styles (Duolingo-style)
 */

export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray50};
  `,

  ProgressSection: styled.div`
    padding: 1rem;
    background: white;
    border-bottom: 1px solid ${(props) => (props.theme as TaviaTheme).colors.gray.gray200};
    position: sticky;
    top: 0;
    z-index: 10;
  `,

  ProgressBar: styled.div`
    width: 100%;
    height: 8px;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray200};
    border-radius: 1rem;
    overflow: hidden;
  `,

  ProgressFill: styled.div<{ $progress: number }>`
    height: 100%;
    background: ${(props) => (props.theme as TaviaTheme).colors.primary};
    border-radius: 1rem;
    width: ${(props) => props.$progress}%;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  `,

  ProgressText: styled.div`
    text-align: center;
    font-size: 0.875rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray600};
    margin-top: 0.5rem;
    font-weight: 600;
  `,

  ChatContainer: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,

  MessagesWrapper: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray300};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray400};
    }
  `,

  AnswerContainer: styled.div`
    padding: 1rem;
    background: white;
    border-top: 1px solid ${(props) => (props.theme as TaviaTheme).colors.gray.gray200};
    max-height: 40vh;
    overflow-y: auto;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray300};
      border-radius: 3px;
    }
  `,

  // Typing indicator
  TypingIndicator: styled.div`
    display: flex;
    align-items: flex-end;
    gap: 0.75rem;
    animation: fadeIn 0.3s ease-in;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  DuoAvatar: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray100};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  `,

  TypingBubble: styled.div`
    background: white;
    padding: 1rem 1.25rem;
    border-radius: 1.25rem 1.25rem 1.25rem 0.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    gap: 0.375rem;
    align-items: center;
  `,

  TypingDot: styled.span<{ $delay: number }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray400};
    animation: typing 1.4s infinite ease-in-out;
    animation-delay: ${(props) => props.$delay}s;

    @keyframes typing {
      0%,
      60%,
      100% {
        transform: translateY(0);
        opacity: 0.7;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }
  `,
};
