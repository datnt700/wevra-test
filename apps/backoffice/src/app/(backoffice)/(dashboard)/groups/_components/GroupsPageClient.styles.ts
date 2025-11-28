import styled from '@emotion/styled';
import { theme } from '@tavia/taviad';

export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
    max-width: 80rem;
    margin: 0 auto;
  `,

  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  `,

  HeaderContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,

  Title: styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.text.primary};
  `,

  Subtitle: styled.p`
    font-size: 1rem;
    color: ${theme.colors.text.secondary};
  `,

  EmptyState: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 4rem 2rem;
    text-align: center;
  `,

  EmptyTitle: styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${theme.colors.text.primary};
  `,

  EmptyDesc: styled.p`
    font-size: 1rem;
    color: ${theme.colors.text.secondary};
  `,

  GroupsGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,

  GroupCard: styled.div`
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-4px);
    }
  `,

  GroupImage: styled.img`
    width: 100%;
    height: 12rem;
    object-fit: cover;
    border-radius: ${theme.radii.lg} ${theme.radii.lg} 0 0;
  `,

  GroupContent: styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,

  GroupHeader: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
  `,

  GroupName: styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${theme.colors.text.primary};
    flex: 1;
  `,

  GroupDesc: styled.p`
    font-size: 0.875rem;
    color: ${theme.colors.text.secondary};
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,

  GroupStats: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.875rem;
    color: ${theme.colors.text.tertiary};
  `,

  GroupStat: styled.span`
    display: flex;
    align-items: center;
    gap: 0.375rem;
  `,

  GroupLocation: styled.p`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    color: ${theme.colors.text.tertiary};
  `,
};
