/**
 * Journey Dashboard
 * Main view showing user's progression, current level, and tasks
 */

'use client';

import { useState } from 'react';
import { LevelCard } from './LevelCard';
import { ProgressHeader } from './ProgressHeader';
import { LEVEL_1_AWARENESS } from '../_constants/levels';
import type { LevelData } from '../_types';
import { Styled } from './JourneyDashboard.styles';

export function JourneyDashboard() {
  // TODO: Get from user session/database
  const [currentLevel] = useState<LevelData>(LEVEL_1_AWARENESS);
  const [userProgress] = useState({
    currentLevel: 1,
    currentStage: 'STARTER' as const,
    totalXP: 100, // From quiz completion
    badges: [],
    completedMilestones: [],
    streak: 0,
    lastActivity: new Date(),
  });

  return (
    <Styled.Container>
      <ProgressHeader userProgress={userProgress} />
      <LevelCard levelData={currentLevel} />
    </Styled.Container>
  );
}
