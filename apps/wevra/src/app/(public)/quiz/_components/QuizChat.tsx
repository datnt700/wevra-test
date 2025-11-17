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
    email: '',
  });
  const [needEmail, setNeedEmail] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'intro',
      type: 'duo',
      content: "Salut! I'm Duo, and I'll help you discover your financial journey. Ready?",
      timestamp: new Date(),
    },
  ]);
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem('quiz-session-id');
    if (existing) return existing;
    const newId =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('quiz-session-id', newId);
    return newId;
  });
  const startTime = useRef(Date.now());

  const [showAnswer, setShowAnswer] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // New state for post-quiz analysis
  const chatEndRef = useRef<HTMLDivElement>(null);
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = QUIZ_QUESTIONS.find((q) => q.step === quizState.currentStep);
  const progress = (quizState.currentStep / TOTAL_STEPS) * 100;

  const submittedRef = useRef(false);
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

  const submitWithEmail = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const timeToFinish = Math.round((Date.now() - startTime.current) / 1000);
    const email = quizState.email.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) return;

    setQuizState((prev) => ({ ...prev, email }));
    setNeedEmail(false);
    setIsAnalyzing(true);

    try {
      // 1) Save email
      const results = await Promise.allSettled([
        fetch('/api/survey/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            email,
            questionId: 'Email',
            value: email,
            step: 0,
          }),
        }),
        fetch('/api/survey/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            questionId: 'stepLastCompleted',
            value: quizState.currentStep,
          }),
        }),
        fetch('/api/survey/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            questionId: 'timeToFinish',
            value: timeToFinish,
          }),
        }),
      ]);
      results.forEach((result, i) => {
        if (result.status === 'rejected') {
          console.error(
            `Failed to submit ${['email', 'stepLastCompleted', 'timeToFinish'][i]}:`,
            result.reason
          );
        }
      });
    } catch (err) {
      submittedRef.current = false;
    } finally {
      completeTimerRef.current = setTimeout(() => {
        setIsAnalyzing(false);
        setQuizState((prev) => ({ ...prev, isComplete: true }));
      }, 800);
    }
  };

  const handleAnswer = async (answer: QuizAnswer, displayText: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Answer received:', answer);
      console.log('💬 Display text:', displayText);
    }

    if (currentQuestion?.type === 'text') {
      const v = await fetch('/api/quiz/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: displayText }),
      }).then((r) => r.json());
      if (!v.ok) {
        addDuoMessage(
          `Hmm… this sentence is not good: ${v.reason}\n\nTry to be more specific (e.g., goal, real-life example, number, deadline).`
        );
        return;
      }
    }
    try {
      fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          email: quizState.email || 'none',
          questionId: answer.questionId,
          value: answer.value,
          step: quizState.currentStep,
        }),
      });
    } catch (err) {
      console.error('Error submitting answer:', err);
    }

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
      if (!submittedRef.current) {
        submittedRef.current = true;
        setShowAnswer(false);
        setNeedEmail(true);
        addDuoMessage(
          "Great! Before I show your results, what's your email so I can save them?",
          undefined
        );
      }
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
        {needEmail && !isAnalyzing && !quizState.isComplete && (
          <Styled.AnswerContainer>
            <Styled.EmailForm onSubmit={submitWithEmail}>
              <Styled.EmailInput
                type="email"
                required
                placeholder="your@email.com"
                value={quizState.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuizState((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <Styled.EmailButton type="submit">Continue</Styled.EmailButton>
            </Styled.EmailForm>
          </Styled.AnswerContainer>
        )}

        {!needEmail && !isAnalyzing && (
          <Styled.AnswerContainer>
            {isTyping || !showAnswer ? (
              <QuizChatAnswer
                question={currentQuestion}
                currentAnswer={getCurrentAnswer()}
                onAnswer={handleAnswer}
                showOnlyInput
                isTyping={isTyping}
              />
            ) : (
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
