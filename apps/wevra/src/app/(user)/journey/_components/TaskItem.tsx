/**
 * Task Item
 * Individual task card with completion state
 */

'use client';

import { Button } from '@eventure/eventured';
import type { Task } from '../_types';
import { Styled } from './TaskItem.styles';

interface TaskItemProps {
  task: Task;
  onComplete?: (taskId: string) => void;
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  const handleClick = () => {
    if (!task.completed && onComplete) {
      onComplete(task.id);
    }
  };

  return (
    <Styled.TaskCard $completed={task.completed}>
      <Styled.Checkbox $completed={task.completed} />
      <Styled.Content>
        <Styled.Title $completed={task.completed}>{task.title}</Styled.Title>
        {task.description && <Styled.Description>{task.description}</Styled.Description>}
      </Styled.Content>
      <Styled.Meta>
        <Styled.TypeBadge>{task.type}</Styled.TypeBadge>
        <Styled.XPBadge>+{task.xpReward} XP</Styled.XPBadge>
        {!task.completed && (
          <Button variant="primary" shape="rounded" onClick={handleClick}>
            Start
          </Button>
        )}
      </Styled.Meta>
    </Styled.TaskCard>
  );
}
