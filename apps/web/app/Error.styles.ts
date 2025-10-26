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
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #dc2626;
  `,

  Message: styled.p`
    font-size: 1.125rem;
    color: #4a5568;
    margin-bottom: 1rem;
    line-height: 1.6;
  `,

  Digest: styled.p`
    font-size: 0.875rem;
    color: #9ca3af;
    margin-bottom: 2rem;
    font-family: monospace;
  `,
};
