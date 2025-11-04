'use client';

/**
 * Chat-based Quiz Interface (Duolingo-style)
 * Conversational quiz experience with Duo mascot
 */

import { useState, useEffect, useRef } from 'react';
import { QuizChatMessage } from './QuizChatMessage';
import { QuizChatAnswer } from './QuizChatAnswer';
import { QuizAnalyzing } from './QuizAnalyzing';
import { QuizResults } from './QuizResults';
import { QUIZ_QUESTIONS, TOTAL_STEPS } from '../_constants/questions';
import type { QuizAnswer, QuizState } from '../_types';
import { Styled } from './QuizChat.styles';

interface ChatMessage {
  id: string;
  type: 'duo' | 'user';
  content: string;
  timestamp: Date;
  questionId?: string;
}

export function QuizChat() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    answers: [],
    isComplete: false,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'intro',
      type: 'duo',
      content: "Salut! I'm Duo, and I'll help you discover your financial journey. Ready?",
      timestamp: new Date(),
    },
  ]);

  const [showAnswer, setShowAnswer] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // New state for post-quiz analysis
  const chatEndRef = useRef<HTMLDivElement>(null);
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = QUIZ_QUESTIONS.find((q) => q.step === quizState.currentStep);
  const progress = (quizState.currentStep / TOTAL_STEPS) * 100;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showAnswer]);

  // Show first question after intro
  useEffect(() => {
    if (messages.length === 1 && currentQuestion) {
      const timer = setTimeout(() => {
        // Combine question and description into one message
        const fullMessage = currentQuestion.description
          ? `${currentQuestion.question}\n\n${currentQuestion.description}`
          : currentQuestion.question;
        addDuoMessage(fullMessage, currentQuestion.id);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const addDuoMessage = (content: string, questionId?: string) => {
    setIsTyping(true);
    setShowAnswer(false); // Hide options while typing
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `duo-${Date.now()}`,
          type: 'duo',
          content,
          timestamp: new Date(),
          questionId,
        },
      ]);
      setIsTyping(false);
      // Show options after message animation completes (300ms animation + small buffer)
      setTimeout(() => {
        setShowAnswer(true);
      }, 400);
    }, 500);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'user',
        content,
        timestamp: new Date(),
      },
    ]);
    setShowAnswer(false);
  };

  const handleAnswer = (answer: QuizAnswer, displayText: string) => {
    console.log('📥 Answer received:', answer);
    console.log('💬 Display text:', displayText);

    // Add user response to chat
    addUserMessage(displayText);

    // Update quiz state
    const existingIndex = quizState.answers.findIndex((a) => a.questionId === answer.questionId);
    const newAnswers =
      existingIndex >= 0
        ? quizState.answers.map((a, i) => (i === existingIndex ? answer : a))
        : [...quizState.answers, answer];

    console.log('📦 Updated answers array:', newAnswers);
    console.log('📊 Total answers so far:', newAnswers.length);

    setQuizState((prev) => ({
      ...prev,
      answers: newAnswers,
    }));

    // Move to next question or complete
    if (quizState.currentStep < TOTAL_STEPS) {
      const nextStep = quizState.currentStep + 1;
      setQuizState((prev) => ({
        ...prev,
        currentStep: nextStep,
      }));

      // Show next question after delay
      setTimeout(() => {
        const nextQuestion = QUIZ_QUESTIONS.find((q) => q.step === nextStep);
        if (nextQuestion) {
          // Combine question and description into one message
          const fullMessage = nextQuestion.description
            ? `${nextQuestion.question}\n\n${nextQuestion.description}`
            : nextQuestion.question;
          addDuoMessage(fullMessage, nextQuestion.id);
        }
      }, 1000);
    } else {
      // Complete quiz - show full-screen analyzing state
      console.log('🏁 Quiz complete! Final answers:', newAnswers);
      console.log('🎯 Moving to analyzing screen...');

      setShowAnswer(false); // Hide input/options immediately
      setIsAnalyzing(true); // Show analyzing screen

      // Show analyzing screen for 3 seconds, then show results
      completeTimerRef.current = setTimeout(() => {
        console.log('✅ Analyzing complete, showing results...');
        setIsAnalyzing(false);
        setQuizState((prev) => ({
          ...prev,
          isComplete: true,
        }));
      }, 3000);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (completeTimerRef.current) {
        clearTimeout(completeTimerRef.current);
      }
    };
  }, []);

  const getCurrentAnswer = () => {
    return quizState.answers.find((a) => a.questionId === currentQuestion?.id);
  };

  // Show analyzing screen after last answer
  if (isAnalyzing) {
    return <QuizAnalyzing />;
  }

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
        <Styled.ProgressText>
          {quizState.currentStep} of {TOTAL_STEPS}
        </Styled.ProgressText>
      </Styled.ProgressSection>

      {/* Chat Messages */}
      <Styled.ChatContainer>
        <Styled.MessagesWrapper>
          {messages.map((message, index) => (
            <QuizChatMessage key={message.id} message={message} delay={index * 100} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <Styled.TypingIndicator>
              <Styled.DuoAvatar>🦉</Styled.DuoAvatar>
              <Styled.TypingBubble>
                <Styled.TypingDot $delay={0} />
                <Styled.TypingDot $delay={0.2} />
                <Styled.TypingDot $delay={0.4} />
              </Styled.TypingBubble>
            </Styled.TypingIndicator>
          )}

          <div ref={chatEndRef} />
        </Styled.MessagesWrapper>

        {/* Answer Options or Input - Hide when analyzing */}
        {!isAnalyzing && (
          <Styled.AnswerContainer>
            {isTyping || !showAnswer ? (
              // Show disabled input while Duo is typing or waiting
              <QuizChatAnswer
                question={currentQuestion}
                currentAnswer={getCurrentAnswer()}
                onAnswer={handleAnswer}
                showOnlyInput={true}
                isTyping={isTyping}
              />
            ) : (
              // Show options when ready to answer
              <QuizChatAnswer
                question={currentQuestion}
                currentAnswer={getCurrentAnswer()}
                onAnswer={handleAnswer}
                showOnlyInput={false}
                isTyping={false}
              />
            )}
          </Styled.AnswerContainer>
        )}
      </Styled.ChatContainer>
    </Styled.Container>
  );
}
