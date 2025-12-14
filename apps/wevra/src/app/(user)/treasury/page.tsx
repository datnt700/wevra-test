'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';
import { Coins, TrendingUp, Award, History } from 'lucide-react';

const Container = styled.div`
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background-color: ${(props) => (props.theme as EventureTheme).colors.surface};
  border: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.div<{ $color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background-color: ${(props) =>
    props.$color || (props.theme as EventureTheme).colors.gray.mainColorLight}20;
  color: ${(props) => props.$color || (props.theme as EventureTheme).colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
`;

const Section = styled.div`
  background-color: ${(props) => (props.theme as EventureTheme).colors.surface};
  border: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.theme as EventureTheme).colors.primary};
  }
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${(props) => (props.theme as EventureTheme).colors.background};
  border: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionDescription = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => (props.theme as EventureTheme).colors.text.primary};
  margin-bottom: 0.25rem;
`;

const TransactionSource = styled.div`
  font-size: 0.875rem;
  color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
`;

const TransactionAmount = styled.div<{ $type?: 'earned' | 'spent' }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) =>
    props.$type === 'spent'
      ? (props.theme as EventureTheme).colors.danger
      : (props.theme as EventureTheme).colors.success};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  font-size: 1.125rem;
`;

export default function TreasuryPage() {
  // Mock data - will be replaced with real data from API
  const [stats] = useState({
    coinBalance: 0,
    totalXP: 0,
    currentLevel: 1,
    totalCoinsEarned: 0,
  });

  const [transactions] = useState<any[]>([]);

  return (
    <Container>
      <Header>
        <Title>💰 Treasury</Title>
        <Subtitle>Track your XP progress and coin earnings</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatIcon $color="#FFD700">
            <Coins />
          </StatIcon>
          <StatContent>
            <StatLabel>Coin Balance</StatLabel>
            <StatValue>{stats.coinBalance.toLocaleString()}</StatValue>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#6366F1">
            <TrendingUp />
          </StatIcon>
          <StatContent>
            <StatLabel>Total XP</StatLabel>
            <StatValue>{stats.totalXP.toLocaleString()}</StatValue>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#10B981">
            <Award />
          </StatIcon>
          <StatContent>
            <StatLabel>Current Level</StatLabel>
            <StatValue>{stats.currentLevel}</StatValue>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#F59E0B">
            <Coins />
          </StatIcon>
          <StatContent>
            <StatLabel>Total Earned</StatLabel>
            <StatValue>{stats.totalCoinsEarned.toLocaleString()}</StatValue>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <History />
            Transaction History
          </SectionTitle>
        </SectionHeader>

        {transactions.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🏦</EmptyIcon>
            <EmptyText>No transactions yet</EmptyText>
            <p>Complete quizzes, lessons, and challenges to earn XP and coins!</p>
          </EmptyState>
        ) : (
          <TransactionList>
            {transactions.map((transaction, index) => (
              <TransactionItem key={index}>
                <TransactionInfo>
                  <TransactionDescription>{transaction.description}</TransactionDescription>
                  <TransactionSource>{transaction.source}</TransactionSource>
                </TransactionInfo>
                <TransactionAmount $type={transaction.amount > 0 ? 'earned' : 'spent'}>
                  {transaction.amount > 0 ? '+' : ''}
                  {transaction.amount} {transaction.type === 'xp' ? 'XP' : 'Coins'}
                </TransactionAmount>
              </TransactionItem>
            ))}
          </TransactionList>
        )}
      </Section>
    </Container>
  );
}
