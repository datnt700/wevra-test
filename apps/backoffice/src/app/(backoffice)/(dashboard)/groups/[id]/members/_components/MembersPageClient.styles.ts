import styled from '@emotion/styled';
import { type TaviaTheme } from '@tavia/taviad';

/**
 * Styled components for MembersPageClient
 */
export const Styled = {
  Container: styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem 1rem;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  `,

  Header: styled.div`
    margin-bottom: 2rem;
  `,

  Title: styled.h1<{ theme?: TaviaTheme }>`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 0.5rem;
  `,

  GroupName: styled.p<{ theme?: TaviaTheme }>`
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 1rem;
  `,

  Stats: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.875rem;
    flex-wrap: wrap;
  `,

  StatText: styled.span<{ theme?: TaviaTheme }>`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
  `,
};
