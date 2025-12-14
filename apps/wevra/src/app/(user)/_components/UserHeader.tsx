'use client';

import { useEffect, useState } from 'react';
import { Coins, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Styled } from './UserHeader.styles';

interface UserStats {
  level: number;
  currentXP: number;
  totalXP: number;
  xpForNextLevel: number;
  coinBalance: number;
  totalCoinsEarned: number;
  totalCoinsSpent: number;
}

interface Props {
  userId: string;
}

export function UserHeader({ userId }: Props) {
  const t = useTranslations('common');
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (isLoading || !stats) {
    return (
      <Styled.HeaderContainer>
        <Styled.XPBadge title={t('loading')}>
          <Zap />
          <Styled.StatValue>...</Styled.StatValue>
        </Styled.XPBadge>

        <Styled.CoinBadge title={t('loading')}>
          <Coins />
          <Styled.StatValue>...</Styled.StatValue>
        </Styled.CoinBadge>
      </Styled.HeaderContainer>
    );
  }

  return (
    <Styled.HeaderContainer>
      <Styled.XPBadge
        title={`Level ${stats.level} - ${stats.currentXP}/${stats.xpForNextLevel} XP`}
      >
        <Zap />
        <Styled.StatValue>{stats.currentXP.toLocaleString()} XP</Styled.StatValue>
      </Styled.XPBadge>

      <Styled.CoinBadge title={`${stats.coinBalance} Coins`}>
        <Coins />
        <Styled.StatValue>{stats.coinBalance.toLocaleString()}</Styled.StatValue>
      </Styled.CoinBadge>
    </Styled.HeaderContainer>
  );
}
