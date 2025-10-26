'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Styled = {
  Container: styled.div`
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 100;
  `,

  Select: styled.select`
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: #ffffff;
    color: #1a1a1a;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='currentColor' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.625rem center;
    background-size: 0.75rem;

    &:hover:not(:disabled) {
      border-color: rgba(0, 0, 0, 0.15);
      background-color: rgba(0, 0, 0, 0.05);
    }

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (prefers-color-scheme: dark) {
      border-color: rgba(255, 255, 255, 0.145);
      background: #1a1a1a;
      color: #ffffff;

      &:hover:not(:disabled) {
        border-color: rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.06);
      }
    }
  `,

  Spinner: styled.span`
    font-size: 1rem;
    animation: ${spin} 1s linear infinite;
  `,
};
