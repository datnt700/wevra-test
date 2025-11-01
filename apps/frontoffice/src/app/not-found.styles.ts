import styled from '@emotion/styled';
import { cssVars, radii } from '@tavia/taviad';

/**
 * Styled components for Not Found Page
 */
export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, ${cssVars.mainColor} 0%, #764ba2 100%);
  `,

  Card: styled.div`
    background: white;
    border-radius: ${radii.xl};
    padding: 3rem 2rem;
    max-width: 500px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  `,

  IconContainer: styled.div`
    margin-bottom: 1.5rem;
  `,

  Icon404: styled.div`
    font-size: 4rem;
    font-weight: 800;
    color: ${cssVars.mainColor};
    line-height: 1;
    margin-bottom: 0.5rem;
  `,

  Title: styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${cssVars.gray900};
    margin: 0 0 0.5rem 0;
  `,

  Message: styled.p`
    font-size: 0.875rem;
    color: ${cssVars.gray600};
    margin: 0 0 2rem 0;
    line-height: 1.5;
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  `,
};
