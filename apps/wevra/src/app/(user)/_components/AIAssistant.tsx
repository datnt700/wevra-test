'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Styled } from './AIAssistant.styles';
import { useSendMessage } from '../_hooks/useAIChat';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function AIAssistant() {
  const t = useTranslations('ai.tutor');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const sendMessageMutation = useSendMessage();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: userMessage,
        isUser: true,
        timestamp: new Date(),
      },
    ]);

    // Add loading message
    const loadingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        text: t('loading'),
        isUser: false,
        timestamp: new Date(),
      },
    ]);

    try {
      // Call AI chat API using React Query mutation
      const data = await sendMessageMutation.mutateAsync({
        message: userMessage,
        // Optional: Add user context for personalized responses
        // userContext: {
        //   stage: userStage,
        //   level: userLevel,
        //   financialAwareness: userStats?.financialAwareness,
        //   habitDiscipline: userStats?.habitDiscipline
        // }
      });

      if (data.success) {
        // Replace loading message with AI response
        setMessages((prev) =>
          prev.map((msg) => (msg.id === loadingId ? { ...msg, text: data.message } : msg))
        );
      } else {
        // Handle error
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId
              ? {
                  ...msg,
                  text: data.error || t('errors.generic'),
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Error calling AI chat:', error);
      // Replace loading message with error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                ...msg,
                text: t('errors.generic'),
              }
            : msg
        )
      );
    }
  };

  const handleQuickAction = async (action: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: action,
        isUser: true,
        timestamp: new Date(),
      },
    ]);

    // Add loading message
    const loadingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        text: t('loading'),
        isUser: false,
        timestamp: new Date(),
      },
    ]);

    try {
      // Call AI chat API using React Query mutation
      const data = await sendMessageMutation.mutateAsync({
        message: action,
      });

      if (data.success) {
        // Replace loading message with AI response
        setMessages((prev) =>
          prev.map((msg) => (msg.id === loadingId ? { ...msg, text: data.message } : msg))
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId
              ? {
                  ...msg,
                  text: data.error || t('errors.generic'),
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Error calling AI chat:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                ...msg,
                text: t('errors.generic'),
              }
            : msg
        )
      );
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Styled.ToggleButton $isOpen={isOpen} onClick={handleToggle}>
        {isOpen ? <X /> : <MessageCircle />}
      </Styled.ToggleButton>

      <Styled.AssistantContainer $isOpen={isOpen}>
        <Styled.Header>
          <Styled.HeaderTitle>
            <Sparkles />
            {t('title')}
          </Styled.HeaderTitle>
          <Styled.CloseButton onClick={handleToggle}>
            <X />
          </Styled.CloseButton>
        </Styled.Header>

        {messages.length === 0 ? (
          <Styled.WelcomeSection>
            <Styled.WelcomeIcon>{t('welcome.icon')}</Styled.WelcomeIcon>
            <Styled.WelcomeTitle>{t('welcome.title')}</Styled.WelcomeTitle>
            <Styled.WelcomeText>{t('welcome.description')}</Styled.WelcomeText>
            <Styled.QuickActions>
              <Styled.QuickActionButton onClick={() => handleQuickAction(t('quickActions.earnXP'))}>
                {t('quickActions.earnXP')}
              </Styled.QuickActionButton>
              <Styled.QuickActionButton
                onClick={() => handleQuickAction(t('quickActions.useCoins'))}
              >
                {t('quickActions.useCoins')}
              </Styled.QuickActionButton>
              <Styled.QuickActionButton
                onClick={() => handleQuickAction(t('quickActions.showProgress'))}
              >
                {t('quickActions.showProgress')}
              </Styled.QuickActionButton>
              <Styled.QuickActionButton
                onClick={() => handleQuickAction(t('quickActions.nextFocus'))}
              >
                {t('quickActions.nextFocus')}
              </Styled.QuickActionButton>
            </Styled.QuickActions>
          </Styled.WelcomeSection>
        ) : (
          <Styled.ChatContainer>
            {messages.map((message) => (
              <Styled.Message key={message.id} $isUser={message.isUser}>
                <Styled.MessageBubble $isUser={message.isUser}>{message.text}</Styled.MessageBubble>
              </Styled.Message>
            ))}
          </Styled.ChatContainer>
        )}

        <Styled.InputContainer>
          <Styled.Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('input.placeholder')}
            rows={1}
          />
          <Styled.SendButton onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send />
          </Styled.SendButton>
        </Styled.InputContainer>
      </Styled.AssistantContainer>
    </>
  );
}
