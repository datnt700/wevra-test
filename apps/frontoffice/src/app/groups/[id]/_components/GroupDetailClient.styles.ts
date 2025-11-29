/** @jsxImportSource @emotion/react */
/**
 * GroupDetailClient Component Styles
 */
import styled from '@emotion/styled';
import { theme } from '@tavia/taviad';

export const Styled = {
  Container: styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: ${theme.spacing.xl};
  `,

  HeroSection: styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    margin-bottom: ${theme.spacing.xl};
  `,

  CoverImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    align-items: flex-start;
    justify-content: space-between;
    gap: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.sm};
  `,

  HeroTitle: styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
      font-size: 1.875rem;
    }
  `,

  BadgeGroup: styled.div`
    display: flex;
    gap: ${theme.spacing.sm};
  `,

  HeroMeta: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: ${theme.spacing.md};
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
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.lg};
  `,

  Section: styled.section`
    background: ${theme.colors.background};
    border-radius: ${theme.radii.lg};
    padding: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.lg};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${theme.spacing.lg};
    gap: ${theme.spacing.lg};
  `,

  HeaderContent: styled.div`
    flex: 1;
  `,

  HeaderTop: styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.sm};
  `,

  Title: styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: ${theme.colors.text.primary};
  `,

  Category: styled.p`
    font-size: 1rem;
    color: ${theme.colors.text.secondary};
    margin: ${theme.spacing.xs} 0;
  `,

  Location: styled.p`
    font-size: 1rem;
    color: ${theme.colors.text.secondary};
    margin: ${theme.spacing.xs} 0;
  `,

  Description: styled.p`
    font-size: 1rem;
    line-height: 1.6;
    color: ${theme.colors.text.primary};
    margin: 0;
    white-space: pre-wrap;
  `,

  Stats: styled.div`
    display: flex;
    gap: ${theme.spacing.xl};
  `,

  StatItem: styled.div`
    font-size: 1rem;
    color: ${theme.colors.text.primary};
  `,

  Actions: styled.div`
    display: flex;
    gap: ${theme.spacing.md};
    flex-shrink: 0;
  `,

  SectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.lg};
  `,

  SectionTitle: styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 ${theme.spacing.lg} 0;
    color: ${theme.colors.text.primary};
  `,

  OrganizerInfo: styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
  `,

  Avatar: styled.div<{ $hasImage: boolean }>`
    width: 3rem;
    height: 3rem;
    border-radius: ${theme.radii.full};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.$hasImage ? 'transparent' : '#d1d5db')};
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
    flex: 1;
  `,

  OrganizerName: styled.p`
    font-weight: 500;
    color: ${theme.colors.text.primary};
    margin: 0;
  `,

  OrganizerRole: styled.p`
    font-size: 0.875rem;
    color: ${theme.colors.text.secondary};
    margin: 0;
  `,

  EmptyState: styled.div`
    text-align: center;
    padding: ${theme.spacing.xl};
    color: ${theme.colors.text.secondary};
  `,

  MembershipStatus: styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
    background: ${theme.colors.background};
    border-radius: ${theme.radii.md};
    margin-bottom: ${theme.spacing.lg};
  `,

  MembershipText: styled.p`
    margin: 0;
    font-size: 0.875rem;
    color: ${theme.colors.text.primary};
  `,
};
