import styled from '@emotion/styled';
import { type TaviaTheme } from '@tavia/taviad';

/**
 * Styled components for GroupDetailClient
 */
export const Styled = {
  HeroSection: styled.div`
    position: relative;
    width: 100%;
    height: 28rem;
    overflow: hidden;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      height: 24rem;
    }
  `,

  HeroPlaceholder: styled.div<{ theme?: TaviaTheme }>`
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.mode === 'dark' ? theme.colors.gray.gray800 : theme.colors.gray.gray200};
  `,

  CoverImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  `,

  HeroOverlay: styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;

    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  `,

  HeroContent: styled.div`
    color: #ffffff;
    margin-bottom: 1rem;
  `,

  HeroHeader: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
  `,

  HeroTitle: styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
      font-size: 1.875rem;
    }
  `,

  BadgeGroup: styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  `,

  HeroMeta: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
  `,

  HeroCategory: styled.p`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  `,

  HeroLocation: styled.p`
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  `,

  HeroStats: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
  `,

  HeroStatItem: styled.span`
    strong {
      font-weight: 600;
      margin-right: 0.25rem;
    }
  `,

  HeroStatDivider: styled.span`
    color: rgba(255, 255, 255, 0.5);
  `,

  HeroActions: styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  Container: styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem 2rem;

    @media (max-width: 768px) {
      padding: 0 1rem 1rem;
    }
  `,

  Section: styled.div<{ theme?: TaviaTheme }>`
    margin-bottom: 1.5rem;
    background-color: ${({ theme }) => theme.colors.surface};
    padding: 2rem;
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow: ${({ theme }) => theme.shadows.sm};

    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  `,

  Header: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  `,

  HeaderContent: styled.div`
    flex: 1;
  `,

  HeaderTop: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  `,

  Title: styled.h1<{ theme?: TaviaTheme }>`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  `,

  Category: styled.p<{ theme?: TaviaTheme }>`
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  `,

  Location: styled.p<{ theme?: TaviaTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.tertiary};
    margin: 0.25rem 0 0 0;
  `,

  Actions: styled.div`
    display: flex;
    gap: 0.5rem;

    @media (max-width: 768px) {
      width: 100%;
      justify-content: flex-start;
    }
  `,

  Stats: styled.div<{ theme?: TaviaTheme }>`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  StatItem: styled.span`
    display: flex;
    align-items: center;
  `,

  Description: styled.div<{ theme?: TaviaTheme }>`
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.6;
  `,

  SectionTitle: styled.h2<{ theme?: TaviaTheme }>`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 1rem 0;
  `,

  SectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,

  OrganizerInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `,

  Avatar: styled.div<{ $hasImage: boolean; theme?: TaviaTheme }>`
    width: 3rem;
    height: 3rem;
    border-radius: ${({ theme }) => theme.radii.full};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $hasImage }) => ($hasImage ? 'transparent' : '#d1d5db')};
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span {
      font-weight: 500;
      color: #4b5563;
      font-size: 1rem;
    }
  `,

  OrganizerDetails: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `,

  OrganizerName: styled.p<{ theme?: TaviaTheme }>`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  `,

  OrganizerRole: styled.p<{ theme?: TaviaTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  `,

  EmptyState: styled.p<{ theme?: TaviaTheme }>`
    color: ${({ theme }) => theme.colors.text.secondary};
    text-align: center;
    padding: 2rem;
  `,
};
