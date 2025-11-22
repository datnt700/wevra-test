import styled from '@emotion/styled';
import { Button, Link } from '@tavia/taviad';

/**
 * Styled components for Header
 */
export const Styled = {
  Wrapper: styled.header`
    background: white;
    border-bottom: 1px solid #e5e7eb;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 999;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  `,

  Content: styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 0.75rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
  `,

  Logo: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
    cursor: pointer;
    flex-shrink: 0;
  `,

  LogoIcon: styled.div`
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #ff695c 0%, #f14c4b 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  `,

  LogoText: styled.h1`
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #ff695c 0%, #f14c4b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,

  SearchContainer: styled.div`
    flex: 1;
    max-width: 600px;

    @media (max-width: 768px) {
      display: none;
    }
  `,

  SearchWrapper: styled.div`
    display: flex;
    align-items: center;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s;

    &:focus-within {
      border-color: #ff695c;
    }
  `,

  SearchInputWrapper: styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 1rem;
    color: #6b7280;

    input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.875rem;
      color: #1f2937;
      width: 100%;

      &::placeholder {
        color: #9ca3af;
      }
    }
  `,

  Divider: styled.div`
    width: 1px;
    height: 32px;
    background: #e5e7eb;
  `,

  LocationInputWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    color: #6b7280;
    min-width: 120px;

    input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.875rem;
      color: #1f2937;
      width: 100%;

      &::placeholder {
        color: #9ca3af;
      }
    }
  `,

  SearchButton: styled.button`
    background: #ff695c;
    color: white;
    border: 2px solid #ff695c;
    padding: 0.625rem 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    margin: -2px;
    margin-left: 0;
    border-radius: 0 10px 10px 0;

    &:hover {
      background: #f14c4b;
      border-color: #f14c4b;
    }

    &:active {
      transform: scale(0.98);
    }
  `,

  Actions: styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-shrink: 0;
  `,

  NavLink: styled(Link)`
    font-size: 0.875rem;
    font-weight: 500;
    color: #495057;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      color: #ff695c;
    }

    @media (max-width: 768px) {
      display: none;
    }
  `,

  Button: styled(Button)`
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,

  UserButton: styled.button`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s;
    border-radius: 50%;
    overflow: hidden;

    &:hover {
      opacity: 0.8;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: none;
    }

    /* Override DropdownMenu trigger border */
    & > * {
      border: none !important;
      border-radius: 50% !important;
    }
  `,

  UserName: styled.span`
    font-size: 0.875rem;
    font-weight: 500;
    color: #1f2937;
    white-space: nowrap;

    @media (max-width: 768px) {
      display: none;
    }
  `,
};
