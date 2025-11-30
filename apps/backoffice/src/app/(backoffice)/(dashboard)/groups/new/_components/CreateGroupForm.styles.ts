import styled from '@emotion/styled';
import { type EventureTheme } from '@eventure/eventured';

export const Styled = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
    max-width: 64rem;
    margin: 0 auto;
  `,

  PageHeader: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,

  PageTitle: styled.h1<{ theme?: EventureTheme }>`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
  `,

  PageSubtitle: styled.p<{ theme?: EventureTheme }>`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  StepProgress: styled.div`
    margin-bottom: 2rem;
  `,

  StepContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  StepItem: styled.div`
    display: flex;
    align-items: center;
    flex: 1;
  `,

  StepContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  StepCircle: styled.div<{ theme?: EventureTheme; $isActive: boolean }>`
    display: flex;
    height: 2.5rem;
    width: 2.5rem;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.radii.full};
    border: 2px solid;
    font-weight: 600;
    transition: all 0.2s;

    ${({ theme, $isActive }) =>
      $isActive
        ? `
          border-color: ${theme.colors.primary};
          background-color: ${theme.colors.primary};
          color: white;
        `
        : `
          border-color: ${theme.colors.border.default};
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text.tertiary};
        `}
  `,

  StepTitle: styled.p<{ theme?: EventureTheme; $isActive: boolean }>`
    margin-top: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;

    ${({ theme, $isActive }) =>
      $isActive ? `color: ${theme.colors.primary};` : `color: ${theme.colors.text.tertiary};`}
  `,

  StepConnector: styled.div<{ theme?: EventureTheme; $isActive: boolean }>`
    margin: 0 1rem;
    height: 2px;
    flex: 1;
    transition: background-color 0.2s;

    ${({ theme, $isActive }) =>
      $isActive
        ? `background-color: ${theme.colors.primary};`
        : `background-color: ${theme.colors.border.default};`}
  `,

  StepFields: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  SummaryCard: styled.div<{ theme?: EventureTheme }>`
    border-radius: ${({ theme }) => theme.radii.lg};
    border: 1px solid ${({ theme }) => theme.colors.border.default};
    background-color: ${({ theme }) => theme.colors.surface};
    padding: 1.5rem;
  `,

  SummaryTitle: styled.h3<{ theme?: EventureTheme }>`
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  `,

  SummaryList: styled.dl`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: 0.875rem;
  `,

  SummaryItem: styled.div``,

  SummaryLabel: styled.dt<{ theme?: EventureTheme }>`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  SummaryValue: styled.dd<{ theme?: EventureTheme }>`
    color: ${({ theme }) => theme.colors.text.tertiary};
  `,

  ButtonGroup: styled.div<{ theme?: EventureTheme }>`
    display: flex;
    gap: 1rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border.default};
    padding-top: 1.5rem;
  `,
};
