import styled from '@emotion/styled';
import { type EventureTheme } from '@eventure/eventured';

export const Styled = {
  Container: styled.div`
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,

  HeaderContent: styled.div`
    flex: 1;
  `,

  Title: styled.h1<{ theme?: EventureTheme }>`
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 0.5rem 0;
  `,

  Subtitle: styled.div<{ theme?: EventureTheme }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  Actions: styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  `,

  StatsGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  `,

  StatCard: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
  `,

  StatIcon: styled.div<{ $color: string; theme?: EventureTheme }>`
    width: 56px;
    height: 56px;
    border-radius: ${({ theme }) => theme.radii.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $color }) => `${$color}15`};
    color: ${({ $color }) => $color};
  `,

  StatContent: styled.div`
    flex: 1;
  `,

  StatValue: styled.div<{ theme?: EventureTheme }>`
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1;
    margin-bottom: 0.25rem;
  `,

  StatLabel: styled.div<{ theme?: EventureTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  Section: styled.div`
    margin-bottom: 2rem;
  `,

  SectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  `,

  SectionTitle: styled.h2<{ theme?: EventureTheme }>`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  `,

  QuickActionsGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  `,

  QuickAction: styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
  `,

  QuickActionTitle: styled.div<{ theme?: EventureTheme }>`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  `,

  QuickActionDesc: styled.div<{ theme?: EventureTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  ActivityGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  `,

  List: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,

  ListItem: styled.div<{ theme?: EventureTheme }>`
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.surfaceHover};
    }
  `,

  ListItemContent: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,

  ListItemTitle: styled.div<{ theme?: EventureTheme }>`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,

  ListItemMeta: styled.div<{ theme?: EventureTheme }>`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};

    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  `,

  ListItemDesc: styled.div<{ theme?: EventureTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.tertiary};
  `,

  EmptyState: styled.div<{ theme?: EventureTheme }>`
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  UpgradeCTA: styled.div<{ theme?: EventureTheme }>`
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    background: linear-gradient(135deg, #fff3cd 0%, #ffe5b4 100%);
    border-radius: ${({ theme }) => theme.radii.lg};

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  `,

  UpgradeContent: styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,

  UpgradeTitle: styled.div<{ theme?: EventureTheme }>`
    font-size: 1.25rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 0.25rem;
  `,

  UpgradeDesc: styled.div<{ theme?: EventureTheme }>`
    color: ${({ theme }) => theme.colors.text.secondary};
  `,
};
