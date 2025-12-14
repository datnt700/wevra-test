/**
 * LevelCard Styles
 */

import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';

export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  LevelHeader: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  LevelTitle: styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
    margin: 0;
  `,
  LevelSubtitle: styled.p`
    font-size: 1.125rem;
    color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
    margin: 0;
    font-style: italic;
  `,
  Goal: styled.p`
    font-size: 0.9375rem;
    color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
    margin: 0;
    padding: 1rem;
    background: ${(props) => (props.theme as EventureTheme).colors.surface};
    border-radius: 8px;
    border-left: 4px solid ${(props) => (props.theme as EventureTheme).colors.primary};
  `,
  TasksList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,
  TasksHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  `,
  TasksTitle: styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
    margin: 0;
  `,
  TaskProgress: styled.span`
    font-size: 0.875rem;
    color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
    font-weight: 600;
  `,
  Milestone: styled.div`
    padding: 1.5rem;
    background: linear-gradient(
      135deg,
      ${(props) => (props.theme as EventureTheme).colors.successLight}20,
      ${(props) => (props.theme as EventureTheme).colors.infoLight}20
    );
    border-radius: 12px;
    border: 2px dashed ${(props) => (props.theme as EventureTheme).colors.border.default};
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
  MilestoneBadge: styled.div`
    font-size: 3rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  MilestoneContent: styled.div`
    flex: 1;
  `,
  MilestoneName: styled.h4`
    font-size: 1.125rem;
    font-weight: 700;
    color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
    margin: 0 0 0.25rem 0;
  `,
  MilestoneDesc: styled.p`
    font-size: 0.9375rem;
    color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
    margin: 0;
  `,
  MilestoneReward: styled.span`
    font-size: 0.875rem;
    font-weight: 700;
    color: ${(props) => (props.theme as EventureTheme).colors.success};
  `,
  AIInsight: styled.div`
    padding: 1rem;
    background: ${(props) => (props.theme as EventureTheme).colors.surface};
    border-radius: 8px;
    border-left: 4px solid ${(props) => (props.theme as EventureTheme).colors.info};
  `,
  AIText: styled.p`
    font-size: 0.9375rem;
    color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
    margin: 0;
    font-style: italic;

    &::before {
      content: '🤖 ';
    }
  `,
};
