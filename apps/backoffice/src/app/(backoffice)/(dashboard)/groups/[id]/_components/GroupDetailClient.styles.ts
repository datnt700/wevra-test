import styled from '@emotion/styled';
import { type TaviaTheme } from '@tavia/taviad';

/**
 * Styled components for GroupDetailClient
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

  CoverImage: styled.div<{ theme?: TaviaTheme }>`
    margin-bottom: 2rem;
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radii.lg};

    img {
      width: 100%;
      height: 16rem;
      object-fit: cover;
    }
  `,

  Section: styled.div<{ theme?: TaviaTheme }>`
    margin-bottom: 1.5rem;
    background-color: #ffffff;
    padding: 2rem;
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);

    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  `,

  Header: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  `,

  HeaderContent: styled.div`
    flex: 1;
  `,

  HeaderTop: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  `,

  Title: styled.h1<{ theme?: TaviaTheme }>`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  `,

  Category: styled.p<{ theme?: TaviaTheme }>`
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  `,

  Location: styled.p<{ theme?: TaviaTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.tertiary};
    margin: 0.25rem 0 0 0;
  `,

  Actions: styled.div`
    display: flex;
    gap: 0.5rem;

    @media (max-width: 768px) {
      width: 100%;
      justify-content: flex-start;
    }
  `,

  Stats: styled.div<{ theme?: TaviaTheme }>`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  StatItem: styled.span`
    display: flex;
    align-items: center;
  `,

  Description: styled.div<{ theme?: TaviaTheme }>`
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.6;
  `,

  SectionTitle: styled.h2<{ theme?: TaviaTheme }>`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 1rem 0;
  `,

  SectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,

  OrganizerInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `,

  Avatar: styled.div<{ $hasImage: boolean; theme?: TaviaTheme }>`
    width: 3rem;
    height: 3rem;
    border-radius: ${({ theme }) => theme.radii.full};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $hasImage }) => ($hasImage ? 'transparent' : '#d1d5db')};
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span {
      font-weight: 500;
      color: #4b5563;
      font-size: 1rem;
    }
  `,

  OrganizerDetails: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `,

  OrganizerName: styled.p<{ theme?: TaviaTheme }>`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  `,

  OrganizerRole: styled.p<{ theme?: TaviaTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  `,

  EmptyState: styled.p<{ theme?: TaviaTheme }>`
    color: ${({ theme }) => theme.colors.text.secondary};
    text-align: center;
    padding: 2rem;
  `,
};
