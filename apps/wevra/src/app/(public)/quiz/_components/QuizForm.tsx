'use client';

/**
 * Quiz Multi-Step Form
 * Main container for the financial assessment quiz
 */

import { useState } from 'react';
import { QuizStepMultipleChoice } from './QuizStepMultipleChoice';
import { QuizStepScale } from './QuizStepScale';
import { QuizStepText } from './QuizStepText';
import { QuizResults } from './QuizResults';
import { QUIZ_QUESTIONS, TOTAL_STEPS } from '../_constants/questions';
import type { QuizAnswer, QuizState } from '../_types';
import { Styled } from './QuizForm.styles';

export function QuizForm() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    answers: [],
    isComplete: false,
  });

  const currentQuestion = QUIZ_QUESTIONS.find((q) => q.step === quizState.currentStep);
  const progress = (quizState.currentStep / TOTAL_STEPS) * 100;

  const handleAnswer = (answer: QuizAnswer) => {
    // Update or add answer
    const existingIndex = quizState.answers.findIndex((a) => a.questionId === answer.questionId);

    const newAnswers =
      existingIndex >= 0
        ? quizState.answers.map((a, i) => (i === existingIndex ? answer : a))
        : [...quizState.answers, answer];

    setQuizState((prev) => ({
      ...prev,
      answers: newAnswers,
    }));
  };

  const handleNext = () => {
    if (quizState.currentStep < TOTAL_STEPS) {
      setQuizState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    } else {
      // Complete quiz
      setQuizState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    }
  };

  const handleBack = () => {
    if (quizState.currentStep > 1) {
      setQuizState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    }
  };

  const getCurrentAnswer = () => {
    return quizState.answers.find((a) => a.questionId === currentQuestion?.id);
  };

  const isCurrentStepAnswered = () => {
    const answer = getCurrentAnswer();
    return answer !== undefined && answer.value !== '';
  };

  // Show results if quiz is complete
  if (quizState.isComplete) {
    return <QuizResults answers={quizState.answers} />;
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <Styled.Container>
      {/* Progress Bar */}
      <Styled.ProgressSection>
        <Styled.ProgressBar>
          <Styled.ProgressFill $progress={progress} />
        </Styled.ProgressBar>
      </Styled.ProgressSection>

      {/* Question Card */}
      <Styled.QuestionCard>
        <Styled.QuestionText>{currentQuestion.question}</Styled.QuestionText>
        {currentQuestion.description && (
          <Styled.QuestionDescription>{currentQuestion.description}</Styled.QuestionDescription>
        )}

        {/* Render appropriate question type */}
        <Styled.AnswerSection>
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <QuizStepMultipleChoice
              question={currentQuestion}
              currentAnswer={getCurrentAnswer()}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'scale' && (
            <QuizStepScale
              question={currentQuestion}
              currentAnswer={getCurrentAnswer()}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'text' && (
            <QuizStepText
              question={currentQuestion}
              currentAnswer={getCurrentAnswer()}
              onAnswer={handleAnswer}
            />
          )}
        </Styled.AnswerSection>

        {/* Navigation */}
        <Styled.NavigationSection>
          {quizState.currentStep > 1 && (
            <Styled.BackButton onClick={handleBack}>Back</Styled.BackButton>
          )}
          <Styled.NextButton
            onClick={handleNext}
            $isDisabled={!isCurrentStepAnswered()}
            disabled={!isCurrentStepAnswered()}
          >
            {quizState.currentStep === TOTAL_STEPS ? 'See Results' : 'Continue'}
          </Styled.NextButton>
        </Styled.NavigationSection>
      </Styled.QuestionCard>
    </Styled.Container>
  );
}
