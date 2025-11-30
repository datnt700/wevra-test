import styled from '@emotion/styled';
import { cssVars, radii } from '@eventure/eventured';

/**
 * Styled components for Error Page
 */
export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
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

  Icon: styled.div`
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: ${cssVars.colorDangerLight};
    border-radius: ${radii.full};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 40px;
      height: 40px;
      color: ${cssVars.colorDanger};
    }
  `,

  Title: styled.h1`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${cssVars.gray900};
    margin-bottom: 0.75rem;
  `,

  Message: styled.p`
    font-size: 1rem;
    color: ${cssVars.gray600};
    margin-bottom: 2rem;
    line-height: 1.6;
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  `,

  ErrorDetails: styled.details`
    margin-top: 1.5rem;
    padding: 1rem;
    background: ${cssVars.gray50};
    border-radius: ${radii.lg};
    text-align: left;

    summary {
      cursor: pointer;
      font-weight: 500;
      color: ${cssVars.gray600};
      margin-bottom: 0.5rem;

      &:hover {
        color: ${cssVars.gray900};
      }
    }
  `,

  ErrorCode: styled.pre`
    font-size: 0.75rem;
    color: ${cssVars.colorDanger};
    background: ${cssVars.colorDangerLight};
    padding: 0.75rem;
    border-radius: ${radii.md};
    overflow-x: auto;
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  `,
};
