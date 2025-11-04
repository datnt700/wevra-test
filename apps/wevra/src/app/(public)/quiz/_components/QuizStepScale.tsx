'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';
import type { QuizQuestion, QuizAnswer } from '../_types';

const ScaleContainer = styled.div`
  padding: 2rem 0;
`;

const ScaleTrack = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 0.75rem;
`;

const ScaleButton = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  height: 3.5rem;
  min-width: 3.5rem;
  border: 3px solid
    ${(props) =>
      props.$isSelected
        ? (props.theme as TaviaTheme).colors.primary
        : (props.theme as TaviaTheme).colors.gray.gray300};
  border-radius: 1rem;
  background-color: ${(props) =>
    props.$isSelected ? (props.theme as TaviaTheme).colors.primary : 'white'};
  color: ${(props) =>
    props.$isSelected ? 'white' : (props.theme as TaviaTheme).colors.gray.gray700};
  font-weight: ${(props) => (props.$isSelected ? '700' : '600')};
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${(props) => (props.theme as TaviaTheme).colors.primary};
    background-color: ${(props) =>
      props.$isSelected
        ? (props.theme as TaviaTheme).colors.primary
        : `${(props.theme as TaviaTheme).colors.gray.mainColorLight}15`};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${(props) => (props.theme as TaviaTheme).colors.gray.mainColorLight}30;
  }
`;

const ScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray600};
  margin-top: 1rem;
`;

const SelectedValue = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => (props.theme as TaviaTheme).colors.primary};
  margin-top: 1.5rem;
`;

interface Props {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
}

export function QuizStepScale({ question, currentAnswer, onAnswer }: Props) {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(
    currentAnswer?.value as number | undefined
  );

  const min = question.scaleMin ?? 0;
  const max = question.scaleMax ?? 10;

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    onAnswer({
      questionId: question.id,
      value,
      points: (value / max) * 100, // Normalize to 0-100
    });
  };

  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <ScaleContainer>
      <ScaleTrack>
        {values.map((value) => (
          <ScaleButton
            key={value}
            $isSelected={selectedValue === value}
            onClick={() => handleSelect(value)}
            type="button"
          >
            {value}
          </ScaleButton>
        ))}
      </ScaleTrack>

      {question.scaleLabels && (
        <ScaleLabels>
          <span>{question.scaleLabels.min}</span>
          <span>{question.scaleLabels.max}</span>
        </ScaleLabels>
      )}

      {selectedValue !== undefined && <SelectedValue>Selected: {selectedValue}</SelectedValue>}
    </ScaleContainer>
  );
}
