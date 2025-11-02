import styled from '@emotion/styled';
import { cssVars, radii } from '@tavia/taviad';

/**
 * Styled components for Restaurants List Page
 */
export const Styled = {
  Container: styled.div`
    padding: 2rem;
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  `,

  HeaderLeft: styled.div``,

  Title: styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  `,

  Subtitle: styled.p`
    color: ${cssVars.gray600};
  `,

  EmptyState: styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background-color: ${cssVars.gray50};
    border-radius: ${radii.md};
  `,

  EmptyStateTitle: styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;
  `,

  EmptyStateDescription: styled.p`
    color: ${cssVars.gray600};
    margin-bottom: 1.5rem;
  `,

  RestaurantsGrid: styled.div`
    display: grid;
    gap: 1rem;
  `,

  RestaurantCard: styled.div`
    border: 1px solid ${cssVars.gray200};
    border-radius: ${radii.md};
    padding: 1.5rem;
    background-color: white;
  `,

  RestaurantRow: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  RestaurantLeft: styled.div`
    flex: 1;
  `,

  RestaurantName: styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  `,

  RestaurantDescription: styled.p`
    color: ${cssVars.gray600};
    margin-bottom: 1rem;
  `,

  RestaurantMeta: styled.div`
    display: flex;
    gap: 2rem;
    font-size: 0.875rem;
    color: ${cssVars.gray600};
  `,

  RestaurantDetails: styled.div`
    margin-top: 1rem;
    font-size: 0.875rem;
    color: ${cssVars.gray600};

    & > div {
      margin-bottom: 0.25rem;
    }
  `,

  RestaurantActions: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
};
