'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';
import type { QuizQuestion, QuizAnswer } from '../_types';

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1.5rem;
  background-color: ${(props) => (props.theme as TaviaTheme).colors.background};
  color: ${(props) => (props.theme as TaviaTheme).colors.text.primary};
  border: 3px solid ${(props) => (props.theme as TaviaTheme).colors.gray.gray300};
  border-radius: 1rem;
  font-size: 1.125rem;
  line-height: 1.6;
  font-family: inherit;
  resize: vertical;
  transition: all 0.15s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${(props) => (props.theme as TaviaTheme).colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.theme as TaviaTheme).colors.primary};
    box-shadow: 0 0 0 4px ${(props) => (props.theme as TaviaTheme).colors.gray.mainColorLight}30;
  }

  &::placeholder {
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray400};
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray500};
  margin-top: 1rem;
`;

interface Props {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
}

export function QuizStepText({ question, currentAnswer, onAnswer }: Props) {
  const [text, setText] = useState<string>((currentAnswer?.value as string) || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    onAnswer({
      questionId: question.id,
      value,
    });
  };

  return (
    <div>
      <TextArea
        value={text}
        onChange={handleChange}
        placeholder="Type your answer here..."
        maxLength={500}
      />
      <CharCount>{text.length} / 500 characters</CharCount>
    </div>
  );
}
