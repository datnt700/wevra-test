import styled from '@emotion/styled';

export const Styled = {
  Container: styled.div`
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  `,

  HeaderLeft: styled.div`
    flex: 1;
  `,

  TitleWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    color: #1f2937;
  `,

  Title: styled.h1`
    font-size: 1.875rem;
    font-weight: 700;
    margin: 0;
    color: #1f2937;
  `,

  Subtitle: styled.p`
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  `,

  UserName: styled.div`
    font-weight: 500;
    color: #1f2937;
  `,

  EmailWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280;

    svg {
      flex-shrink: 0;
    }
  `,

  RoleBadgeWrapper: styled.div<{ $bg: string; $color: string }>`
    display: inline-block;

    /* Override taviad Badge styles */
    > div {
      background-color: ${({ $bg }) => $bg};
      color: ${({ $color }) => $color};
      font-weight: 600;
      text-transform: capitalize;
      border-radius: 9999px;
    }
  `,

  DateWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280;

    svg {
      flex-shrink: 0;
    }
  `,

  ActionsWrapper: styled.div`
    display: flex;
    gap: 0.5rem;

    button {
      min-width: auto;
    }
  `,

  DataTableWrapper: styled.div`
    /* Override DataTable styles */

    /* Remove container border */
    > div > div {
      border: none !important;
      max-height: none !important;
      overflow-y: visible !important;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: none !important;
    }

    thead {
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: none !important;
    }

    tbody tr {
      transition: background-color 0.2s;
      background-color: transparent !important;

      &:hover {
        background-color: #f9fafb !important;
      }
    }

    td {
      padding: 1rem;
      font-size: 0.875rem;
      color: #374151;
      border: none !important;
    }
  `,

  StatLabel: styled.div`
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 0.5rem;
  `,

  StatValue: styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
  `,
};
