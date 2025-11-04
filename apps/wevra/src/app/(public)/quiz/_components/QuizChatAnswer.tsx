'use client';

/**
 * Chat Answer Component
 * Renders answer options with chat input at bottom (Duolingo-style)
 */

import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';
import { useState, useEffect } from 'react';
import type { QuizQuestion, QuizAnswer } from '../_types';

interface QuizChatAnswerProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer, displayText: string) => void;
  showOnlyInput?: boolean; // When true, hide options and show only input
  isTyping?: boolean; // When true, show typing placeholder
}

export function QuizChatAnswer({
  question,
  currentAnswer,
  onAnswer,
  showOnlyInput = false,
  isTyping = false,
}: QuizChatAnswerProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const scaleMin = question.scaleMin ?? 0;
  const scaleMax = question.scaleMax ?? 10;
  const [scaleValue, setScaleValue] = useState<number>(Math.floor((scaleMin + scaleMax) / 2));
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double-click

  // Reset input when question changes
  useEffect(() => {
    setInputValue('');
    setSelectedOption(null);
    setScaleValue(Math.floor((scaleMin + scaleMax) / 2));
    setIsSubmitting(false); // Reset lock when question changes
  }, [question.id, scaleMin, scaleMax]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    if (question.type === 'multiple-choice' && selectedOption) {
      const option = question.options?.find((opt) => opt.value === selectedOption);
      if (option) {
        onAnswer(
          {
            questionId: question.id,
            value: option.value,
            points: option.points,
          },
          inputValue
        );
      }
    } else if (question.type === 'scale') {
      onAnswer(
        {
          questionId: question.id,
          value: scaleValue.toString(),
          points: scaleValue * 10,
        },
        inputValue
      );
    } else if (question.type === 'text') {
      onAnswer(
        {
          questionId: question.id,
          value: inputValue,
        },
        inputValue
      );
    }
  };

  const handleOptionClick = (option: {
    id: string;
    label: string;
    value: string;
    points?: number;
  }) => {
    if (isSubmitting) return; // Prevent double-click
    setIsSubmitting(true);
    setSelectedOption(option.value);
    setInputValue(option.label);
    // Auto-send after selecting option
    setTimeout(() => {
      onAnswer(
        {
          questionId: question.id,
          value: option.value,
          points: option.points,
        },
        option.label
      );
    }, 300);
  };

  const handleScaleClick = (value: number) => {
    if (isSubmitting) return; // Prevent double-click
    setIsSubmitting(true);
    setScaleValue(value);
    const displayText = `${value}`;
    setInputValue(displayText);
    // Auto-send after selecting scale value
    setTimeout(() => {
      onAnswer(
        {
          questionId: question.id,
          value: value, // Send actual value, not string
          points: undefined, // Let analyzeQuiz calculate points
        },
        displayText
      );
    }, 300);
  };

  const isInputDisabled = question.type === 'multiple-choice' || question.type === 'scale';

  // Determine placeholder text
  const getPlaceholder = () => {
    if (isTyping) return 'Duo is typing...';
    if (isInputDisabled) return 'Choose an option above...';
    return 'Type your answer...';
  };

  return (
    <>
      {/* Answer Options Above Input - Only show when NOT showOnlyInput */}
      {!showOnlyInput && question.type === 'multiple-choice' && question.options && (
        <Styled.OptionsGrid>
          {question.options.map((option) => (
            <Styled.OptionButton
              key={option.id}
              onClick={() => handleOptionClick(option)}
              $isSelected={selectedOption === option.value}
              type="button"
            >
              {option.label}
            </Styled.OptionButton>
          ))}
        </Styled.OptionsGrid>
      )}

      {!showOnlyInput && question.type === 'scale' && (
        <Styled.ScaleContainer>
          <Styled.ScaleLabels>
            <span>{question.scaleLabels?.min || scaleMin}</span>
            <span>{question.scaleLabels?.max || scaleMax}</span>
          </Styled.ScaleLabels>

          <Styled.ScaleButtons>
            {Array.from({ length: scaleMax - scaleMin + 1 }, (_, i) => scaleMin + i).map(
              (value) => (
                <Styled.ScaleButton
                  key={value}
                  $isSelected={scaleValue === value}
                  onClick={() => handleScaleClick(value)}
                  type="button"
                >
                  {value}
                </Styled.ScaleButton>
              )
            )}
          </Styled.ScaleButtons>
        </Styled.ScaleContainer>
      )}

      {/* Chat Input at Bottom (like Duolingo) */}
      <Styled.ChatInputContainer>
        <Styled.ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isInputDisabled) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={getPlaceholder()}
          disabled={isInputDisabled || showOnlyInput}
          rows={question.type === 'text' ? 3 : 1}
        />
        <Styled.SendButton
          onClick={handleSend}
          disabled={!inputValue.trim() || (isInputDisabled && !selectedOption)}
          type="button"
          aria-label="Send answer"
        >
          <Styled.SendIcon>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </Styled.SendIcon>
        </Styled.SendButton>
      </Styled.ChatInputContainer>
    </>
  );
}

const Styled = {
  // Multiple Choice Options
  OptionsGrid: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  `,

  OptionButton: styled.button<{ $isSelected?: boolean }>`
    padding: 1rem 1.25rem;
    background: ${(props) =>
      props.$isSelected
        ? (props.theme as TaviaTheme).colors.primary + '10'
        : (props.theme as TaviaTheme).colors.background};
    border: 2px solid
      ${(props) =>
        props.$isSelected
          ? (props.theme as TaviaTheme).colors.primary
          : (props.theme as TaviaTheme).colors.border.default};
    border-radius: 1rem;
    font-size: 1rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.primary};
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover {
      border-color: ${(props) => (props.theme as TaviaTheme).colors.border.hover};
      background: ${(props) => (props.theme as TaviaTheme).colors.surfaceHover};
      transform: translateY(-2px);
    }

    &:active {
      transform: scale(0.98);
    }
  `,

  // Scale
  ScaleContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  `,

  ScaleLabels: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.secondary};
    font-weight: 500;
  `,

  ScaleButtons: styled.div`
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: 0.5rem;
  `,

  ScaleButton: styled.button<{ $isSelected: boolean }>`
    aspect-ratio: 1;
    border-radius: 0.5rem;
    border: 2px solid
      ${(props) =>
        props.$isSelected
          ? (props.theme as TaviaTheme).colors.primary
          : (props.theme as TaviaTheme).colors.border.default};
    background: ${(props) =>
      props.$isSelected
        ? (props.theme as TaviaTheme).colors.primary
        : (props.theme as TaviaTheme).colors.background};
    color: ${(props) =>
      props.$isSelected ? '#ffffff' : (props.theme as TaviaTheme).colors.text.primary};
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${(props) => (props.theme as TaviaTheme).colors.border.hover};
      ${(props) =>
        !props.$isSelected && `background: ${(props.theme as TaviaTheme).colors.surfaceHover};`}
    }

    &:active {
      transform: scale(0.95);
    }
  `,

  // Chat Input (Duolingo-style)
  ChatInputContainer: styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
  `,

  ChatInput: styled.textarea`
    flex: 1;
    padding: 1rem 1.25rem;
    border: 2px solid ${(props) => (props.theme as TaviaTheme).colors.border.default};
    border-radius: 1.5rem;
    font-size: 1rem;
    font-family: inherit;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.primary};
    background: ${(props) => (props.theme as TaviaTheme).colors.background};
    resize: none;
    transition: all 0.2s ease;
    line-height: 1.5;

    &:focus {
      outline: none;
      border-color: ${(props) => (props.theme as TaviaTheme).colors.border.focus};
    }

    &::placeholder {
      color: ${(props) => (props.theme as TaviaTheme).colors.text.secondary};
    }

    &:disabled {
      background: ${(props) => (props.theme as TaviaTheme).colors.surface};
      cursor: not-allowed;
      opacity: 0.7;
    }
  `,

  SendButton: styled.button`
    min-width: 56px;
    height: 48px;
    padding: 0 1.25rem;
    border-radius: 1.5rem;
    border: none;
    background: ${(props) => (props.theme as TaviaTheme).colors.primary};
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.875rem;
    box-shadow: 0 4px 12px ${(props) => (props.theme as TaviaTheme).colors.primary}30;

    &:hover:not(:disabled) {
      filter: brightness(1.1);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${(props) => (props.theme as TaviaTheme).colors.primary}40;
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.98);
      box-shadow: 0 2px 8px ${(props) => (props.theme as TaviaTheme).colors.primary}30;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  `,

  SendIcon: styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(1px);
  `,
};
