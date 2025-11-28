import styled from '@emotion/styled';
import { radii } from '../../../theme/tokens/radii';
import { cssVars } from '../../../theme/tokens/colors';

export const Styled = {
  Container: styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
    display: flex;
    flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'row' : 'column')};
    align-items: ${({ $orientation }) => ($orientation === 'horizontal' ? 'center' : 'flex-start')};
    gap: ${({ $orientation }) => ($orientation === 'horizontal' ? '0' : '1rem')};
    width: 100%;
  `,

  StepItem: styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
    display: flex;
    flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'column' : 'row')};
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    position: relative;
  `,

  StepContent: styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
    display: flex;
    flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'column' : 'row')};
    align-items: center;
    gap: 0.75rem;
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
    transition: opacity 0.2s;

    &:hover {
      opacity: ${({ onClick }) => (onClick ? '0.8' : '1')};
    }
  `,

  StepCircle: styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: ${radii.full};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    flex-shrink: 0;

    ${({ $isCompleted, $isActive }) => {
      if ($isCompleted) {
        return `
          background-color: ${cssVars.colorSuccess};
          color: ${cssVars.light};
          border: 2px solid ${cssVars.colorSuccess};
        `;
      }
      if ($isActive) {
        return `
          background-color: ${cssVars.mainColor};
          color: ${cssVars.light};
          border: 2px solid ${cssVars.mainColor};
        `;
      }
      return `
        background-color: ${cssVars.light};
        color: ${cssVars.gray500};
        border: 2px solid ${cssVars.gray300};
      `;
    }}
  `,

  StepInfo: styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ $orientation }) => ($orientation === 'horizontal' ? 'center' : 'flex-start')};
    text-align: ${({ $orientation }) => ($orientation === 'horizontal' ? 'center' : 'left')};
    min-width: ${({ $orientation }) => ($orientation === 'horizontal' ? '100px' : 'auto')};
  `,

  StepLabel: styled.span<{ $isActive: boolean }>`
    font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
    font-size: 0.875rem;
    color: ${({ $isActive }) => ($isActive ? cssVars.gray900 : cssVars.gray600)};
    transition: color 0.2s;
  `,

  StepDescription: styled.span`
    font-size: 0.75rem;
    color: ${cssVars.gray500};
    margin-top: 0.25rem;
  `,

  StepConnector: styled.div<{
    $isActive: boolean;
    $orientation: 'horizontal' | 'vertical';
  }>`
    ${({ $orientation }) =>
      $orientation === 'horizontal'
        ? `
      flex: 1;
      height: 2px;
      margin: 0 0.5rem;
    `
        : `
      width: 2px;
      min-height: 2rem;
      margin-left: 1.2rem;
    `}

    background-color: ${({ $isActive }) => ($isActive ? cssVars.mainColor : cssVars.gray300)};
    transition: background-color 0.3s ease;
  `,
};
