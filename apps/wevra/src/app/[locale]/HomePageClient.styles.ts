import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';

/**
 * Chat-based Quiz Styles (Duolingo-style)
 */

export const Styled = {
  Container: styled.main`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 2rem;
    padding-top: 5rem; /* Account for fixed header */
    padding-bottom: 5rem; /* Account for fixed footer */

    @media (max-width: 1024px) {
      padding: 1.5rem;
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
  `,

  Content: styled.div`
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
  `,

  IllustrationSection: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      order: 1;
    }
  `,

  Illustration: styled.div<{ mainColorLight: string; mainColor: string }>`
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
    background: linear-gradient(
      135deg,
      ${(p) => p.mainColorLight}20 0%,
      ${(p) => p.mainColor}10 100%
    );
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8rem;
    position: relative;
    overflow: hidden;

    &::before {
      content: '💰';
      position: absolute;
      top: 10%;
      left: 10%;
      font-size: 4rem;
      animation: float 3s ease-in-out infinite;
    }

    &::after {
      content: '📈';
      position: absolute;
      bottom: 15%;
      right: 15%;
      font-size: 3.5rem;
      animation: float 3s ease-in-out infinite 1.5s;
    }

    @keyframes float {
      0%,
      100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  `,

  MainEmoji: styled.div`
    font-size: 12rem;
    animation: float 3s ease-in-out infinite 0.75s;

    @media (max-width: 768px) {
      font-size: 8rem;
    }
  `,

  CTASection: styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      order: 2;
      align-items: center;
    }
  `,

  Title: styled.h1<{ gray900: string }>`
    font-size: 2.5rem;
    font-weight: 800;
    color: ${(p) => p.gray900};
    margin-bottom: 1.5rem;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  `,

  ButtonsContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 400px;
    }
  `,
};
