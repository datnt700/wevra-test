import styled from '@emotion/styled';
import { type EventureTheme } from '@eventure/eventured';

/**
 * Styled components for BackofficeHeader
 */
export const Styled = {
  Wrapper: styled.header<{ theme?: EventureTheme }>`
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
    width: 100%;
    z-index: 100;
  `,

  Content: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.5rem; /* Reduced horizontal padding to align with sidebar */
    max-width: 100%;

    /* Mobile: reduce padding */
    @media (max-width: 768px) {
      padding: 0.5rem 1rem; /* Reduced from 0.75rem */
    }
  `,

  LeftSection: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 64px; /* Match collapsed sidebar width */
  `,

  MenuButton: styled.button<{ theme?: EventureTheme }>`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
    width: auto;
    height: auto;
    margin: 0;

    &:hover {
      background-color: ${({ theme }) => theme.colors.surfaceHover};
    }

    svg {
      width: 20px; /* Match sidebar icon size */
      height: 20px;
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  `,

  Logo: styled.div<{ theme?: EventureTheme }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text.primary};
  `,

  LogoIcon: styled.div<{ theme?: EventureTheme }>`
    width: 32px;
    height: 32px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.primaryHover} 100%
    );
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  `,

  LogoText: styled.h1<{ $isMobile?: boolean; theme?: EventureTheme }>`
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.primaryHover} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    /* Hide on small mobile screens */
    @media (max-width: 640px) {
      display: none;
    }

    /* Smaller font on tablet */
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  `,

  RightSection: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,

  UserInfo: styled.div<{ theme?: EventureTheme }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  `,

  Avatar: styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
  `,

  UserName: styled.span<{ $isMobile?: boolean; theme?: EventureTheme }>`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};

    /* Hide username on small screens */
    @media (max-width: 640px) {
      display: none;
    }
  `,

  SignOutButton: styled.button<{ theme?: EventureTheme }>`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    transition: all 0.2s;
    color: ${({ theme }) => theme.colors.text.secondary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.surfaceHover};
      color: ${({ theme }) => theme.colors.text.primary};
    }

    svg {
      width: 18px;
      height: 18px;
    }
  `,
};
