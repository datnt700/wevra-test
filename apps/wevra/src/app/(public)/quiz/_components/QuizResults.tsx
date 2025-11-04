'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@tavia/taviad';
import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';
import type { QuizAnswer, QuizResult } from '../_types';
import { analyzeQuizResults } from '../_utils/analyzeQuiz';

interface Props {
  answers: QuizAnswer[];
}

export function QuizResults({ answers }: Props) {
  const router = useRouter();

  const result: QuizResult = useMemo(() => {
    return analyzeQuizResults(answers);
  }, [answers]);

  const getScoreEmoji = (score: number): string => {
    if (score >= 70) return '🎉';
    if (score >= 40) return '💪';
    return '🌱';
  };

  const getStageEmoji = (stage: string): string => {
    const emojis = {
      STARTER: '🌱',
      STABILIZER: '💪',
      BUILDER: '🚀',
      GROWER: '🏆',
    };
    return emojis[stage as keyof typeof emojis] || '✨';
  };

  return (
    <Styled.Container>
      <Styled.Content>
        {/* Progress Bar - Compact */}
        <Styled.ProgressBar>
          <Styled.ProgressFill $progress={100} />
        </Styled.ProgressBar>

        {/* Main Content Grid */}
        <Styled.MainGrid>
          {/* Left Column - Stage & Scores */}
          <Styled.LeftColumn>
            {/* Stage Card */}
            <Styled.StageCard>
              <Styled.StageLabel>YOUR CURRENT STAGE</Styled.StageLabel>
              <Styled.StageName>
                {getStageEmoji(result.stage)} {result.stage}
              </Styled.StageName>
              <Styled.StageDescription>{getStageDescription(result.stage)}</Styled.StageDescription>
            </Styled.StageCard>

            {/* Scores Grid */}
            <Styled.ScoresGrid>
              <Styled.ScoreCard>
                <Styled.ScoreEmoji>
                  {getScoreEmoji(result.profile.financialAwareness)}
                </Styled.ScoreEmoji>
                <Styled.ScoreValue>{result.profile.financialAwareness}%</Styled.ScoreValue>
                <Styled.ScoreLabel>Financial Awareness</Styled.ScoreLabel>
              </Styled.ScoreCard>
              <Styled.ScoreCard>
                <Styled.ScoreEmoji>
                  {getScoreEmoji(result.profile.habitDiscipline)}
                </Styled.ScoreEmoji>
                <Styled.ScoreValue>{result.profile.habitDiscipline}%</Styled.ScoreValue>
                <Styled.ScoreLabel>Habit Discipline</Styled.ScoreLabel>
              </Styled.ScoreCard>
              <Styled.ScoreCard>
                <Styled.ScoreEmoji>{getScoreEmoji(result.profile.motivation)}</Styled.ScoreEmoji>
                <Styled.ScoreValue>{result.profile.motivation}%</Styled.ScoreValue>
                <Styled.ScoreLabel>Motivation</Styled.ScoreLabel>
              </Styled.ScoreCard>
            </Styled.ScoresGrid>
          </Styled.LeftColumn>

          {/* Right Column - Recommendations */}
          <Styled.RightColumn>
            <Styled.RecommendationsCard>
              <Styled.CardTitle>📌 Your Personalized Recommendations</Styled.CardTitle>
              <Styled.RecommendationsList>
                {result.recommendations.slice(0, 3).map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </Styled.RecommendationsList>
            </Styled.RecommendationsCard>

            <Styled.NextStepsCard>
              <Styled.CardTitle>🚀 Your Next Steps</Styled.CardTitle>
              <Styled.NextStepsList>
                {result.nextSteps.slice(0, 3).map((step, index) => (
                  <Styled.NextStepItem key={index}>
                    <Styled.StepNumber>{index + 1}</Styled.StepNumber>
                    <Styled.StepText>{step}</Styled.StepText>
                  </Styled.NextStepItem>
                ))}
              </Styled.NextStepsList>
            </Styled.NextStepsCard>
          </Styled.RightColumn>
        </Styled.MainGrid>

        {/* Action Buttons */}
        <Styled.ActionContainer>
          <Button variant="secondary" shape="rounded" onClick={() => window.location.reload()}>
            Retake Quiz
          </Button>
          <Button variant="primary" shape="rounded" onClick={() => router.push('/journey')}>
            Start Your Journey →
          </Button>
        </Styled.ActionContainer>
      </Styled.Content>
    </Styled.Container>
  );
}

function getStageDescription(stage: string): string {
  const descriptions = {
    STARTER:
      "You're just getting started — and that's a great place to begin. We'll help you master the basics: saving, tracking, and building money confidence.",
    STABILIZER:
      "You're building consistency! Let's solidify your habits and create a simple, sustainable system.",
    BUILDER:
      "You're ready to grow. You understand the basics — now it's time to start investing and planning long-term.",
    GROWER: "You're already in control — now optimize for growth and long-term wealth.",
  };
  return descriptions[stage as keyof typeof descriptions] || '';
}

const Styled = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray50};
    padding: 1rem;
  `,

  Content: styled.div`
    width: 100%;
    max-width: 1400px;
    height: 100vh;
    max-height: 900px;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  `,

  ProgressBar: styled.div`
    width: 100%;
    height: 6px;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray200};
    position: relative;
  `,

  ProgressFill: styled.div<{ $progress: number }>`
    height: 100%;
    background: ${(props) => (props.theme as TaviaTheme).colors.primary};
    width: ${(props) => props.$progress}%;
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  `,

  MainGrid: styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
    overflow: hidden;
  `,

  LeftColumn: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  RightColumn: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  StageCard: styled.div`
    background: linear-gradient(
      135deg,
      ${(props) => (props.theme as TaviaTheme).colors.primary}15 0%,
      white 100%
    );
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 2px 12px ${(props) => (props.theme as TaviaTheme).colors.primary}20;
    text-align: center;
  `,

  StageLabel: styled.div`
    font-size: 0.75rem;
    font-weight: 700;
    color: ${(props) => (props.theme as TaviaTheme).colors.primary};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  `,

  StageName: styled.div`
    font-size: 2.5rem;
    font-weight: 900;
    color: ${(props) => (props.theme as TaviaTheme).colors.primary};
    margin-bottom: 1rem;
  `,

  StageDescription: styled.p`
    font-size: 0.9375rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray700};
    line-height: 1.6;
    margin: 0;
  `,

  ScoresGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  `,

  ScoreCard: styled.div`
    text-align: center;
    padding: 1.5rem 1rem;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray50};
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  `,

  ScoreEmoji: styled.div`
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  `,

  ScoreValue: styled.div`
    font-size: 2rem;
    font-weight: 800;
    color: ${(props) => (props.theme as TaviaTheme).colors.primary};
    margin-bottom: 0.5rem;
  `,

  ScoreLabel: styled.div`
    font-size: 0.75rem;
    font-weight: 600;
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray600};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,

  RecommendationsCard: styled.div`
    flex: 1;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray50};
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  `,

  NextStepsCard: styled.div`
    flex: 1;
    background: linear-gradient(
      135deg,
      ${(props) => (props.theme as TaviaTheme).colors.primary}08 0%,
      ${(props) => (props.theme as TaviaTheme).colors.gray.gray50} 100%
    );
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  `,

  CardTitle: styled.h3`
    font-size: 1.125rem;
    font-weight: 700;
    color: ${(props) => (props.theme as TaviaTheme).colors.primary};
    margin: 0 0 1rem 0;
  `,

  RecommendationsList: styled.ul`
    margin: 0;
    padding-left: 1.25rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray700};

    li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
      font-size: 0.9375rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  `,

  NextStepsList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  NextStepItem: styled.div`
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  `,

  StepNumber: styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => (props.theme as TaviaTheme).colors.primary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.875rem;
    flex-shrink: 0;
  `,

  StepText: styled.div`
    flex: 1;
    font-size: 0.9375rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.gray.gray700};
    line-height: 1.6;
    padding-top: 0.25rem;
  `,

  ActionContainer: styled.div`
    padding: 1.5rem 2rem;
    background: ${(props) => (props.theme as TaviaTheme).colors.gray.gray50};
    border-top: 1px solid ${(props) => (props.theme as TaviaTheme).colors.gray.gray200};
    display: flex;
    gap: 1rem;
    justify-content: center;
  `,
};
