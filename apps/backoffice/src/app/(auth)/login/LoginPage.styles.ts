/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { cssVars } from '@eventure/eventured';

/**
 * Styled components for Login Page
 */
export const Styled = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, ${cssVars.gray50} 0%, ${cssVars.gray100} 100%);
    padding: 1rem;
  `,

  Wrapper: styled.div`
    width: 100%;
    max-width: 28rem;
  `,

  Header: styled.div`
    margin-bottom: 2rem;
    text-align: center;
  `,

  Logo: styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: ${cssVars.gray900};
    margin: 0;
  `,

  Title: styled.h1`
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-weight: 700;
    color: ${cssVars.gray900};
    letter-spacing: -0.02em;
  `,

  Subtitle: styled.p`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${cssVars.gray600};
  `,

  CardHeader: styled.div`
    margin-bottom: 1.5rem;
    padding: 2rem 2rem 0 2rem;

    @media (max-width: 640px) {
      padding: 1.5rem 1.5rem 0 1.5rem;
    }
  `,

  CardTitle: styled.h2`
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${cssVars.gray900};
  `,

  Description: styled.p`
    font-size: 0.875rem;
    color: ${cssVars.gray600};
  `,

  AlertWrapper: styled.div`
    margin-bottom: 1.5rem;
    padding: 0 2rem;

    @media (max-width: 640px) {
      padding: 0 1.5rem;
    }
  `,

  FormFields: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 0 2rem;

    @media (max-width: 640px) {
      padding: 0 1.5rem;
    }

    button[type='submit'] {
      width: 100%;
    }
  `,

  RememberRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  `,

  ButtonContent: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  `,

  Divider: styled.div`
    position: relative;
    margin: 1.5rem 2rem;
    height: 1px;
    background-color: ${cssVars.gray200};

    @media (max-width: 640px) {
      margin: 1.5rem 1.5rem;
    }
  `,

  DividerText: styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 1rem;
    background-color: white;
    font-size: 0.875rem;
    color: ${cssVars.gray500};
    white-space: nowrap;
  `,

  OAuthButtons: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0 2rem;
    margin-bottom: 1.5rem;

    @media (max-width: 640px) {
      padding: 0 1.5rem;
    }

    button {
      width: 100%;
    }
  `,

  CardFooter: styled.p`
    padding: 0 2rem 2rem 2rem;
    text-align: center;
    font-size: 0.875rem;
    color: ${cssVars.gray600};

    @media (max-width: 640px) {
      padding: 0 1.5rem 1.5rem 1.5rem;
    }
  `,

  Copyright: styled.p`
    margin-top: 2rem;
    text-align: center;
    font-size: 0.75rem;
    color: ${cssVars.gray500};
  `,
};
