'use client';

import styled from '@emotion/styled';

export const Styled = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1.5rem;
  `,

  Content: styled.div`
    text-align: center;
    max-width: 500px;
  `,

  Title: styled.h1`
    font-size: 6rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 4rem;
    }
  `,

  Subtitle: styled.h2`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a1a1a;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  `,

  Message: styled.p`
    font-size: 1.125rem;
    color: #4a5568;
    margin-bottom: 2rem;
    line-height: 1.6;
  `,
};
