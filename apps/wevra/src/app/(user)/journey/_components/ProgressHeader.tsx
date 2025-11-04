/**
 * Progress Header
 * Shows user's overall progress: level, XP, stage
 */

'use client';

import { Card } from '@tavia/taviad';
import type { UserProgress } from '../_types';
import { getTitleFromLevel, getStageFromLevel, STAGES } from '../_constants/progression';
import { Styled } from './ProgressHeader.styles';

interface ProgressHeaderProps {
  userProgress: UserProgress;
}

export function ProgressHeader({ userProgress }: ProgressHeaderProps) {
  const title = getTitleFromLevel(userProgress.currentLevel);
  const stage = getStageFromLevel(userProgress.currentLevel);
  const stageConfig = STAGES[stage];

  // Calculate XP progress (250 XP per level)
  const xpForCurrentLevel = (userProgress.currentLevel - 1) * 250;
  const xpIntoCurrentLevel = userProgress.totalXP - xpForCurrentLevel;
  const xpToNextLevel = 250 - xpIntoCurrentLevel;
  const xpPercentage = (xpIntoCurrentLevel / 250) * 100;

  return (
    <Card>
      <Styled.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Styled.LevelBadge $stage={stage}>{userProgress.currentLevel}</Styled.LevelBadge>
          <div>
            <Styled.Title>{title}</Styled.Title>
            <Styled.Subtitle>
              {stageConfig.island} • Level {userProgress.currentLevel}/20
            </Styled.Subtitle>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <Styled.XPText>{xpIntoCurrentLevel} / 250 XP</Styled.XPText>
            <Styled.XPText>
              {xpToNextLevel} XP to level {userProgress.currentLevel + 1}
            </Styled.XPText>
          </div>
          <Styled.XPBar>
            <Styled.XPFill $percentage={xpPercentage} />
          </Styled.XPBar>
        </div>
      </Styled.Header>
    </Card>
  );
}
