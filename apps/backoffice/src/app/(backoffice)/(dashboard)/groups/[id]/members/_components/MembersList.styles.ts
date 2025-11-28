import styled from '@emotion/styled';
import { type TaviaTheme } from '@tavia/taviad';

/**
 * Styled components for MembersList
 */
export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  Section: styled.div<{ theme?: TaviaTheme }>`
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
  `,

  SectionTitle: styled.h2<{ theme?: TaviaTheme }>`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 1rem;
  `,

  MembersList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  MemberCard: styled.div<{ theme?: TaviaTheme }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-radius: ${({ theme }) => theme.radii.lg};
    border: 1px solid ${({ theme }) => theme.colors.border.default};
    gap: 1rem;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,

  MemberInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
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

  MemberDetails: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  `,

  MemberNameWithRoles: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  `,

  MemberName: styled.p<{ theme?: TaviaTheme }>`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  `,

  MemberEmail: styled.p<{ theme?: TaviaTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  `,

  MemberMeta: styled.p<{ theme?: TaviaTheme }>`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text.tertiary};
    margin: 0;
  `,

  RoleBadge: styled.span<{ $role: 'moderator' | 'admin'; theme?: TaviaTheme }>`
    border-radius: ${({ theme }) => theme.radii.full};
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    ${({ $role }) =>
      $role === 'moderator'
        ? `
      background-color: #dbeafe;
      color: #1e40af;
    `
        : `
      background-color: #d1fae5;
      color: #065f46;
    `}
  `,

  ActionButtons: styled.div`
    display: flex;
    gap: 0.5rem;

    @media (max-width: 640px) {
      width: 100%;
      justify-content: flex-end;
    }
  `,

  EmptyState: styled.p<{ theme?: TaviaTheme }>`
    color: ${({ theme }) => theme.colors.text.secondary};
    padding: 2rem;
    text-align: center;
  `,
};
