import styled from '@emotion/styled';
import { type EventureTheme } from '@eventure/eventured';

/**
 * Styled components for EditGroupForm
 */
export const Styled = {
  PageContainer: styled.div`
    max-width: 42rem;
    margin: 0 auto;
  `,

  PageHeader: styled.div`
    margin-bottom: 2rem;
  `,

  PageTitle: styled.h1<{ theme?: EventureTheme }>`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 0.5rem;
  `,

  PageSubtitle: styled.p<{ theme?: EventureTheme }>`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  `,

  FormContainer: styled.form<{ theme?: EventureTheme }>`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid ${({ theme }) => theme.colors.border.default};
  `,

  ButtonGroup: styled.div<{ theme?: EventureTheme }>`
    display: flex;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  `,

  DangerZone: styled.div<{ theme?: EventureTheme }>`
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: ${({ theme }) => theme.radii.lg};
    border: 1px solid ${({ theme }) => theme.colors.danger};
  `,

  DangerTitle: styled.h3<{ theme?: EventureTheme }>`
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.danger};
    margin-bottom: 0.5rem;
  `,

  DangerDescription: styled.p<{ theme?: EventureTheme }>`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 1rem;
  `,
};
