import styled from '@emotion/styled';
import { theme } from '@tavia/taviad';

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

  PageTitle: styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.text.primary};
  `,

  PageSubtitle: styled.p`
    font-size: 1rem;
    color: ${theme.colors.text.secondary};
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

  StepCircle: styled.div<{ $isActive: boolean }>`
    display: flex;
    height: 2.5rem;
    width: 2.5rem;
    align-items: center;
    justify-content: center;
    border-radius: ${theme.radii.full};
    border: 2px solid;
    font-weight: 600;
    transition: all 0.2s;

    ${({ $isActive }) =>
      $isActive
        ? `
          border-color: ${theme.colors.primary};
          background-color: ${theme.colors.primary};
          color: white;
        `
        : `
          border-color: ${theme.colors.border.default};
          background-color: white;
          color: ${theme.colors.text.tertiary};
        `}
  `,

  StepTitle: styled.p<{ $isActive: boolean }>`
    margin-top: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;

    ${({ $isActive }) =>
      $isActive ? `color: ${theme.colors.primary};` : `color: ${theme.colors.text.tertiary};`}
  `,

  StepConnector: styled.div<{ $isActive: boolean }>`
    margin: 0 1rem;
    height: 2px;
    flex: 1;
    transition: background-color 0.2s;

    ${({ $isActive }) =>
      $isActive
        ? `background-color: ${theme.colors.primary};`
        : `background-color: ${theme.colors.border.default};`}
  `,

  StepFields: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  SummaryCard: styled.div`
    border-radius: ${theme.radii.lg};
    border: 1px solid ${theme.colors.border.default};
    background-color: ${theme.colors.surface};
    padding: 1.5rem;
  `,

  SummaryTitle: styled.h3`
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${theme.colors.text.primary};
  `,

  SummaryList: styled.dl`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: 0.875rem;
  `,

  SummaryItem: styled.div``,

  SummaryLabel: styled.dt`
    font-weight: 500;
    color: ${theme.colors.text.secondary};
  `,

  SummaryValue: styled.dd`
    color: ${theme.colors.text.tertiary};
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 1rem;
    border-top: 1px solid ${theme.colors.border.default};
    padding-top: 1.5rem;
  `,
};
