import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';

// Duolingo-style quiz form components
export const Styled = {
  Container: styled.div`
    max-width: 50rem;
    margin: 0 auto;
    padding: 0 1rem;
  `,

  ProgressSection: styled.div`
    margin-bottom: 3rem;
  `,

  ProgressBar: styled.div`
    height: 1rem;
    background-color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray200};
    border-radius: 999px;
    overflow: hidden;
    position: relative;
  `,

  ProgressFill: styled.div<{ $progress: number }>`
    height: 100%;
    background: linear-gradient(
      90deg,
      ${(props) => (props.theme as TaviaTheme).colors.primary} 0%,
      ${(props) => (props.theme as TaviaTheme).colors.gray.mainColorLight} 100%
    );
    width: ${(props) => props.$progress}%;
    transition: width 0.3s ease;
    border-radius: 999px;
  `,

  QuestionCard: styled.div`
    background: white;
    border-radius: 1rem;
    padding: 3rem 2.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
    min-height: 400px;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      padding: 2rem 1.5rem;
      min-height: 350px;
    }
  `,

  QuestionText: styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray900};
    margin-bottom: 3rem;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  `,

  QuestionDescription: styled.p`
    font-size: 1.125rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray600};
    margin-bottom: 2.5rem;
    line-height: 1.6;
  `,

  AnswerSection: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,

  NavigationSection: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid ${(props) => (props.theme as TaviaTheme).colors.gray.gray200};
  `,

  BackButton: styled.button`
    padding: 0.875rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray700};
    background: transparent;
    border: 2px solid ${(props) => (props.theme as TaviaTheme).colors.gray.gray300};
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray100};
      border-color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray400};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,

  NextButton: styled.button<{ $isDisabled?: boolean }>`
    padding: 0.875rem 2.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    background: ${(props) =>
      props.$isDisabled
        ? (props.theme as TaviaTheme).colors.gray.gray400
        : (props.theme as TaviaTheme).colors.primary};
    border: none;
    border-radius: 0.75rem;
    cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &:hover {
      background: ${(props) =>
        props.$isDisabled
          ? (props.theme as TaviaTheme).colors.gray.gray400
          : (props.theme as TaviaTheme).colors.gray.mainColorLight};
      transform: ${(props) => (props.$isDisabled ? 'none' : 'translateY(-1px)')};
      box-shadow: ${(props) => (props.$isDisabled ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.15)')};
    }
  `,
};
