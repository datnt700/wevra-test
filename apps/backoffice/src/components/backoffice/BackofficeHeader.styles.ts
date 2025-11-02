import styled from '@emotion/styled';

/**
 * Styled components for BackofficeHeader
 */
export const Styled = {
  Wrapper: styled.header`
    background: white;
    border-bottom: 1px solid #e5e7eb;
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

  MenuButton: styled.button`
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
      background-color: #f3f4f6;
    }

    svg {
      width: 20px; /* Match sidebar icon size */
      height: 20px;
      color: #374151;
    }
  `,

  Logo: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #1f2937;
  `,

  LogoIcon: styled.div`
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #ff695c 0%, #f14c4b 100%);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  `,

  LogoText: styled.h1<{ $isMobile?: boolean }>`
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #ff695c 0%, #f14c4b 100%);
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

  UserInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #f9fafb;
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

  UserName: styled.span<{ $isMobile?: boolean }>`
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;

    /* Hide username on small screens */
    @media (max-width: 640px) {
      display: none;
    }
  `,

  SignOutButton: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    transition: all 0.2s;
    color: #6b7280;

    &:hover {
      background-color: #fee2e2;
      color: #dc2626;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  `,
};
