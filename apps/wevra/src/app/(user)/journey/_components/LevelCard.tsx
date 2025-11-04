/**
 * Level Card
 * Shows current level details, tasks, and milestone
 */

'use client';

import { Card } from '@tavia/taviad';
import type { LevelData } from '../_types';
import { calculateLevelProgress } from '../_constants/levels';
import { TaskItem } from './TaskItem';
import { Styled } from './LevelCard.styles';

interface LevelCardProps {
  levelData: LevelData;
}

export function LevelCard({ levelData }: LevelCardProps) {
  const progress = calculateLevelProgress(levelData);

  return (
    <Card>
      <Styled.Container>
        <Styled.LevelHeader>
          <Styled.LevelTitle>
            🧭 Level {levelData.level} – {levelData.title}
          </Styled.LevelTitle>
          <Styled.LevelSubtitle>"{levelData.subtitle}"</Styled.LevelSubtitle>
        </Styled.LevelHeader>

        <Styled.Goal>
          <strong>Goal:</strong> {levelData.goal}
        </Styled.Goal>

        <div>
          <Styled.TasksHeader>
            <Styled.TasksTitle>🧱 Tasks</Styled.TasksTitle>
            <Styled.TaskProgress>
              {progress.completedTasks}/{progress.totalTasks} completed • {progress.earnedXP}/
              {progress.totalXP} XP
            </Styled.TaskProgress>
          </Styled.TasksHeader>

          <Styled.TasksList>
            {levelData.tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </Styled.TasksList>
        </div>

        <Styled.Milestone>
          <Styled.MilestoneBadge>{levelData.milestone.badge}</Styled.MilestoneBadge>
          <Styled.MilestoneContent>
            <Styled.MilestoneName>💎 Milestone: {levelData.milestone.name}</Styled.MilestoneName>
            <Styled.MilestoneDesc>{levelData.milestone.description}</Styled.MilestoneDesc>
            <Styled.MilestoneReward>
              Reward: +{levelData.milestone.xpReward} XP
            </Styled.MilestoneReward>
          </Styled.MilestoneContent>
        </Styled.Milestone>

        <Styled.AIInsight>
          <Styled.AIText>{levelData.aiInsight}</Styled.AIText>
        </Styled.AIInsight>

        {levelData.unlocks && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', opacity: 0.7 }}>
              🚀 Unlocks: {levelData.unlocks}
            </p>
          </div>
        )}
      </Styled.Container>
    </Card>
  );
}
