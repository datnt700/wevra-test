import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Button, Link } from '@tavia/taviad';

/**
 * Styled components for Header
 */
export const Styled = {
  Wrapper: styled(motion.header)<{ $isScrolled: boolean }>`
    background: white;
    border-bottom: 1px solid #e5e7eb;
    position: ${({ $isScrolled }) => ($isScrolled ? 'fixed' : 'relative')};
    top: ${({ $isScrolled }) => ($isScrolled ? '0' : 'auto')};
    left: ${({ $isScrolled }) => ($isScrolled ? '0' : 'auto')};
    right: ${({ $isScrolled }) => ($isScrolled ? '0' : 'auto')};
    width: 100%;
    z-index: 999;
  `,

  Content: styled.div<{ $isScrolled: boolean }>`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ $isScrolled }) => ($isScrolled ? '1rem' : '0')};
  `,

  Logo: styled(motion.div)<{ $isScrolled: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
    cursor: pointer;

    svg {
      width: ${({ $isScrolled }) => ($isScrolled ? '27px' : '30px')};
      height: ${({ $isScrolled }) => ($isScrolled ? '27px' : '30px')};
    }
  `,

  LogoIcon: styled.div`
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff695c 0%, #f14c4b 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  `,

  LogoText: styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #ff695c 0%, #f14c4b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,

  Nav: styled(motion.nav)<{ $isScrolled: boolean }>`
    display: ${({ $isScrolled }) => ($isScrolled ? 'none' : 'flex')};
    align-items: center;
    gap: 2rem;

    @media (max-width: 768px) {
      display: none;
    }
  `,

  NavLink: styled(Link)`
    font-size: 1rem;
    font-weight: 500;
    color: #495057;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: #ff695c;
    }
  `,

  Actions: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,

  Button: styled(Button)`
    font-size: 0.875rem;
    padding: 0.625rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,

  SearchBarContainer: styled(motion.div)<{ $isScrolled: boolean }>`
    flex: 1;
    max-width: ${({ $isScrolled }) => ($isScrolled ? '600px' : '0')};
    opacity: ${({ $isScrolled }) => ($isScrolled ? '1' : '0')};
    visibility: ${({ $isScrolled }) => ($isScrolled ? 'visible' : 'hidden')};
    overflow: hidden;

    @media (max-width: 768px) {
      max-width: ${({ $isScrolled }) => ($isScrolled ? '100%' : '0')};
    }
  `,
};
