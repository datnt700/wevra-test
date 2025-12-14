'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { QUIZ_QUESTIONS, TOTAL_STEPS } from '../_constants/questions';
import type {
  ChatMessage,
  LocalizedQuizQuestion,
  QuizAnswer,
  QuizState,
  QuizQuestionOptionBase,
} from '../_types';
import { QuizMessage } from './QuizMessage';
import { QuizChatAnswer } from './QuizChatAnswer';
import { QuizAnalyzing } from './QuizAnalyzing';
import { QuizResults } from './QuizResults';
import { Styled } from './QuizChat.styles';

export function QuizChat() {
  const t = useTranslations('quiz');
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    answers: [],
    isComplete: false,
    email: '',
  });
  const locale = useLocale();
  const [needEmail, setNeedEmail] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef(Date.now());
  const submittedRef = useRef(false);

  // Session ID
  const [sessionId] = useState(() => {
    const existing = typeof window !== 'undefined' ? localStorage.getItem('quiz-session-id') : null;
    if (existing) return existing;
    const newId =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    if (typeof window !== 'undefined') {
      localStorage.setItem('quiz-session-id', newId);
    }
    return newId;
  });

  const getLocalizedQuestion = (step: number): LocalizedQuizQuestion | undefined => {
    const base = QUIZ_QUESTIONS.find((q) => q.step === step);
    if (!base) return undefined;

    const baseKey = `questions.${base.id}`;
    const { options: baseOptions, ...rest } = base as any;

    const localized: LocalizedQuizQuestion = {
      ...rest,
      question: t(`${baseKey}.question`),
    };

    // ---- description  ----
    const descKey = `${baseKey}.description`;
    const desc = t(descKey);
    const missingDescKey = `quiz.${descKey}`;

    if (desc && desc !== missingDescKey) {
      localized.description = desc;
    }

    // ---- options ----
    if (base.type === 'multiple-choice' && baseOptions) {
      localized.options = (baseOptions as QuizQuestionOptionBase[]).map((opt) => ({
        ...opt,
        label: t(`${baseKey}.options.${opt.id}`),
      }));
    }

    // ---- placeholder (text) ----
    if (base.type === 'text') {
      const phKey = `${baseKey}.placeholder`;
      const ph = t(phKey);
      const missingPhKey = `quiz.${phKey}`;
      if (ph && ph !== missingPhKey) {
        localized.placeholder = ph;
      }
    }

    // ---- scale labels ----
    if (base.type === 'scale') {
      const minKey = `${baseKey}.scaleLabels.min`;
      const maxKey = `${baseKey}.scaleLabels.max`;
      const min = t(minKey);
      const max = t(maxKey);
      const missingMinKey = `quiz.${minKey}`;
      const missingMaxKey = `quiz.${maxKey}`;

      if (min && max && min !== missingMinKey && max !== missingMaxKey) {
        localized.scaleLabels = { min, max };
      }
    }

    return localized;
  };

  const currentQuestion = getLocalizedQuestion(quizState.currentStep);
  const progress = (quizState.currentStep / TOTAL_STEPS) * 100;

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showAnswer]);

  // Intro message: quiz.intro
  useEffect(() => {
    setMessages([
      {
        id: 'intro',
        type: 'duo',
        content: t('intro'),
        timestamp: new Date(),
      },
    ]);
  }, [t]);

  useEffect(() => {
    if (messages.length === 1 && currentQuestion) {
      const timer = setTimeout(() => {
        const fullMessage = currentQuestion.description
          ? `${currentQuestion.question}\n\n${currentQuestion.description}`
          : currentQuestion.question;

        addDuoMessage(fullMessage, currentQuestion.id);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messages.length, currentQuestion?.id]);

  const timersRef = useRef<number[]>([]);
  const setAppTimeout = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };
  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const addDuoMessage = (content: string, questionId?: string) => {
    setIsTyping(true);
    setShowAnswer(false);
    setAppTimeout(() => {
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
      setAppTimeout(() => {
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
      await Promise.allSettled([
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
    } catch {
      submittedRef.current = false;
    } finally {
      completeTimerRef.current = setTimeout(() => {
        setIsAnalyzing(false);
        setQuizState((prev) => ({ ...prev, isComplete: true }));
      }, 800);
    }
  };

  const handleAnswer = async (answer: QuizAnswer, displayText: string) => {
    if (currentQuestion?.type === 'text') {
      const v = await fetch('/api/quiz/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: displayText, locale }),
      }).then((r) => r.json());
      if (!v.ok) {
        addDuoMessage(t('invalidText', { reason: v.reason }));
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
      }).catch((e) => console.error(e));
    } catch (err) {
      console.error('Error submitting answer:', err);
    }

    addUserMessage(displayText);

    setQuizState((prev) => {
      const existingIndex = prev.answers.findIndex((a) => a.questionId === answer.questionId);
      const answers =
        existingIndex >= 0
          ? prev.answers.map((a, i) => (i === existingIndex ? answer : a))
          : [...prev.answers, answer];
      return { ...prev, answers };
    });

    if (quizState.currentStep < TOTAL_STEPS) {
      const nextStep = quizState.currentStep + 1;
      setQuizState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));

      setTimeout(() => {
        const nextQuestion = getLocalizedQuestion(nextStep);
        if (nextQuestion) {
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
        addDuoMessage(t('askEmail'), undefined);
        setNeedEmail(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, []);

  const getCurrentAnswer = () => {
    return quizState.answers.find((a) => a.questionId === currentQuestion?.id);
  };

  if (isAnalyzing) return <QuizAnalyzing />;

  if (quizState.isComplete) return <QuizResults answers={quizState.answers} />;

  if (!currentQuestion) return null;

  return (
    <Styled.Container data-testid="quiz-container">
      <Styled.ProgressSection data-testid="quiz-progress-section">
        <Styled.ProgressBar data-testid="quiz-progress-bar">
          <Styled.ProgressFill data-testid="quiz-progress-fill" $progress={progress} />
        </Styled.ProgressBar>
        <Styled.ProgressText data-testid="quiz-progress-text">
          {quizState.currentStep} of {TOTAL_STEPS}
        </Styled.ProgressText>
      </Styled.ProgressSection>

      <Styled.ChatContainer data-testid="quiz-chat-container">
        <Styled.MessagesWrapper data-testid="quiz-messages">
          {messages.map((message, index) => (
            <div
              key={message.id}
              data-testid="chat-message"
              data-role={message.type}
              data-message-id={message.id}
            >
              <QuizMessage message={message} delay={index * 100} />
            </div>
          ))}

          {isTyping && (
            <Styled.TypingIndicator data-testid="chat-typing">
              <Styled.DuoAvatar data-testid="chat-duo-avatar">🦉</Styled.DuoAvatar>
              <Styled.TypingBubble data-testid="chat-typing-bubble">
                <Styled.TypingDot $delay={0} />
                <Styled.TypingDot $delay={0.2} />
                <Styled.TypingDot $delay={0.4} />
              </Styled.TypingBubble>
            </Styled.TypingIndicator>
          )}

          <div ref={chatEndRef} data-testid="chat-end" />
        </Styled.MessagesWrapper>

        {needEmail && !isAnalyzing && !quizState.isComplete && (
          <Styled.AnswerContainer data-testid="quiz-email-container">
            <Styled.EmailForm data-testid="chat-email-form" onSubmit={submitWithEmail}>
              <Styled.EmailInput
                data-testid="quiz-input-email"
                type="email"
                required
                placeholder="your@email.com"
                value={quizState.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuizState((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <Styled.EmailButton data-testid="chat-email-submit" type="submit">
                Continue
              </Styled.EmailButton>
            </Styled.EmailForm>
          </Styled.AnswerContainer>
        )}

        {!needEmail && !isAnalyzing && (
          <Styled.AnswerContainer data-testid="quiz-answer-container">
            <QuizChatAnswer
              question={currentQuestion as any}
              currentAnswer={getCurrentAnswer()}
              onAnswer={handleAnswer}
              showOnlyInput={isTyping || !showAnswer}
              isTyping={isTyping || !showAnswer}
            />
          </Styled.AnswerContainer>
        )}
      </Styled.ChatContainer>
    </Styled.Container>
  );
}
