import styled from '@emotion/styled';
import { cssVars, radii } from '@tavia/taviad';

/**
 * Styled components for Dashboard Page
 */

// Define QuickActionLink first to avoid circular reference
const QuickActionLink = styled.a<{ $isPrimary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: ${({ $isPrimary }) =>
    $isPrimary ? `2px dashed ${cssVars.gray300}` : `1px solid ${cssVars.gray200}`};
  border-radius: ${radii.lg};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    border-color: ${cssVars.mainColor};
    background-color: ${cssVars.mainColorLight9};
  }
`;

export const Styled = {
  Container: styled.div`
    min-height: 100vh;
    background-color: ${cssVars.gray50};
  `,

  Header: styled.header`
    border-bottom: 1px solid ${cssVars.gray200};
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  `,

  HeaderContent: styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 1rem 1.5rem;

    @media (min-width: 640px) {
      padding: 1rem 1.5rem;
    }

    @media (min-width: 1024px) {
      padding: 1rem 2rem;
    }
  `,

  HeaderRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  HeaderLeft: styled.div``,

  Title: styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${cssVars.gray900};
  `,

  Subtitle: styled.p`
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: ${cssVars.gray600};
  `,

  HeaderRight: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,

  RoleBadge: styled.span`
    padding: 0.25rem 0.75rem;
    background-color: ${cssVars.mainColorLight9};
    color: ${cssVars.mainColor};
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: ${radii.full};
  `,

  Main: styled.main`
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1rem;

    @media (min-width: 640px) {
      padding: 2rem 1.5rem;
    }

    @media (min-width: 1024px) {
      padding: 2rem 2rem;
    }
  `,

  StatsGrid: styled.div`
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,

  StatCard: styled.div`
    padding: 1.5rem;
    background-color: white;
    border: 1px solid ${cssVars.gray100};
    border-radius: ${radii.xl};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  `,

  StatCardRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  StatCardLeft: styled.div``,

  StatLabel: styled.p`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${cssVars.gray600};
  `,

  StatValue: styled.p`
    margin-top: 0.5rem;
    font-size: 1.875rem;
    font-weight: 700;
    color: ${cssVars.gray900};
  `,

  StatIcon: styled.div<{ $color: string; $iconColor?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: ${radii.lg};
    background-color: ${({ $color }) => $color};

    svg {
      color: ${({ $iconColor }) => $iconColor || 'currentColor'};
    }
  `,

  QuickActionsCard: styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: white;
    border: 1px solid ${cssVars.gray100};
    border-radius: ${radii.xl};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  `,

  QuickActionsTitle: styled.h2`
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${cssVars.gray900};
  `,

  QuickActionsGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  `,

  QuickActionLink,

  QuickActionIcon: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: ${radii.lg};
    background-color: ${cssVars.gray100};
    transition: all 0.2s;

    ${QuickActionLink}:hover & {
      background-color: ${cssVars.mainColor};
    }
  `,

  QuickActionIconSvg: styled.svg`
    width: 1.25rem;
    height: 1.25rem;
    color: ${cssVars.gray600};

    ${QuickActionLink}:hover & {
      color: white;
    }
  `,

  QuickActionText: styled.span`
    font-weight: 500;
    color: ${cssVars.gray700};

    ${QuickActionLink}:hover & {
      color: ${cssVars.gray900};
    }
  `,

  RestaurantsCard: styled.div`
    background-color: white;
    border: 1px solid ${cssVars.gray100};
    border-radius: ${radii.xl};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  `,

  RestaurantsHeader: styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid ${cssVars.gray200};
  `,

  RestaurantsTitle: styled.h2`
    font-size: 1.125rem;
    font-weight: 600;
    color: ${cssVars.gray900};
  `,

  RestaurantsList: styled.div`
    & > * + * {
      border-top: 1px solid ${cssVars.gray200};
    }
  `,

  RestaurantItem: styled.div`
    padding: 1.5rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${cssVars.gray50};
    }
  `,

  RestaurantRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  RestaurantLeft: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,

  RestaurantImage: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: ${radii.lg};
    background-color: ${cssVars.gray200};
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: ${cssVars.gray400};
    }
  `,

  RestaurantInfo: styled.div``,

  RestaurantName: styled.h3`
    font-weight: 600;
    color: ${cssVars.gray900};
  `,

  RestaurantAddress: styled.p`
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: ${cssVars.gray600};
  `,

  RestaurantMeta: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;

    /* Status tag styling */
    .status-active {
      background-color: ${cssVars.colorSuccessLight};

      & > div {
        color: ${cssVars.colorGreenDark};
      }
    }

    .status-inactive {
      background-color: ${cssVars.gray100};

      & > div {
        color: ${cssVars.gray800};
      }
    }
  `,

  RestaurantMetaText: styled.span`
    font-size: 0.75rem;
    color: ${cssVars.gray500};
  `,

  RestaurantManageLink: styled.a`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${cssVars.mainColor};
    text-decoration: none;
    border-radius: ${radii.lg};
    transition: background-color 0.2s;

    &:hover {
      background-color: ${cssVars.mainColorLight9};
    }
  `,

  EmptyState: styled.div`
    padding: 3rem;
    background-color: white;
    border: 1px solid ${cssVars.gray100};
    border-radius: ${radii.xl};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    text-align: center;
  `,

  EmptyStateIcon: styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    border-radius: ${radii.full};
    background-color: ${cssVars.gray100};

    svg {
      width: 2rem;
      height: 2rem;
      color: ${cssVars.gray400};
    }
  `,

  EmptyStateTitle: styled.h3`
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${cssVars.gray900};
  `,

  EmptyStateDescription: styled.p`
    margin-bottom: 1.5rem;
    color: ${cssVars.gray600};
  `,

  ButtonIcon: styled.span`
    margin-right: 0.5rem;
  `,
};
