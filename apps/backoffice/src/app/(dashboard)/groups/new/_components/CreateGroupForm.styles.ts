import styled from '@emotion/styled';
import { cssVars } from '@tavia/taviad';

export const Styled = {
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
    border-radius: 50%;
    border: 2px solid;
    font-weight: 600;
    transition: all 0.2s;

    ${({ $isActive }) =>
      $isActive
        ? `
          border-color: ${cssVars.colorCyan};
          background-color: ${cssVars.colorCyan};
          color: white;
        `
        : `
          border-color: ${cssVars.gray300};
          background-color: white;
          color: ${cssVars.gray400};
        `}
  `,

  StepTitle: styled.p<{ $isActive: boolean }>`
    margin-top: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;

    ${({ $isActive }) =>
      $isActive ? `color: ${cssVars.colorCyan};` : `color: ${cssVars.gray400};`}
  `,

  StepConnector: styled.div<{ $isActive: boolean }>`
    margin: 0 1rem;
    height: 2px;
    flex: 1;
    transition: background-color 0.2s;

    ${({ $isActive }) =>
      $isActive
        ? `background-color: ${cssVars.colorCyan};`
        : `background-color: ${cssVars.gray300};`}
  `,

  StepFields: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  SummaryCard: styled.div`
    border-radius: 0.5rem;
    border: 1px solid ${cssVars.gray200};
    background-color: ${cssVars.gray50};
    padding: 1.5rem;
  `,

  SummaryTitle: styled.h3`
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
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
    color: ${cssVars.gray700};
  `,

  SummaryValue: styled.dd`
    color: ${cssVars.gray600};
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 1rem;
    border-top: 1px solid ${cssVars.gray200};
    padding-top: 1.5rem;
  `,
};
