'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';
import type { QuizQuestionBase, QuizAnswer } from '../_types';

const OptionButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  text-align: left;
  padding: 1.5rem 2rem;
  border: 3px solid
    ${(props) =>
      props.$isSelected
        ? (props.theme as EventureTheme).colors.primary
        : (props.theme as EventureTheme).colors.gray.gray300};
  border-radius: 1rem;
  background-color: ${(props) =>
    props.$isSelected ? `${(props.theme as EventureTheme).colors.gray.mainColorLight}10` : 'white'};
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${(props) => (props.theme as EventureTheme).colors.gray.gray900};
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${(props) => (props.theme as EventureTheme).colors.primary};
    background-color: ${(props) => (props.theme as EventureTheme).colors.gray.mainColorLight}08;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${(props) => (props.theme as EventureTheme).colors.gray.mainColorLight}30;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface Props {
  question: QuizQuestionBase;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
}

export function QuizStepMultipleChoice({ question, currentAnswer, onAnswer }: Props) {
  const handleSelect = (optionValue: string, points?: number) => {
    onAnswer({
      questionId: question.id,
      value: optionValue,
      points: points || 0,
    });
  };

  // Guard: ensure the question actually exposes an options array before using it
  if (!('options' in question) || !Array.isArray((question as any).options)) {
    return null;
  }

  const options =
    (
      question as unknown as {
        options?: { id: string; value: string; label: string; points?: number }[];
      }
    ).options ?? [];

  return (
    <OptionsContainer>
      {options.map((option) => (
        <OptionButton
          key={option.id}
          $isSelected={currentAnswer?.value === option.value}
          onClick={() => handleSelect(option.value, option.points)}
          type="button"
        >
          {option.label}
        </OptionButton>
      ))}
    </OptionsContainer>
  );
}
