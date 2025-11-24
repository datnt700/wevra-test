import styled from '@emotion/styled';
import { cssVars } from '@tavia/taviad';

export const Styled = {
  Container: styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  `,

  Title: styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: ${cssVars.gray900};
  `,

  Content: styled.div`
    /* Card styles handled by @tavia/taviad */
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,

  Section: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  SectionTitle: styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${cssVars.gray800};
    margin-bottom: 0.5rem;
  `,

  SectionDescription: styled.p`
    font-size: 0.875rem;
    color: ${cssVars.gray600};
    margin-bottom: 0.5rem;
  `,

  InputGroup: styled.div`
    /* Input styles handled by @tavia/taviad InputText */
  `,

  Actions: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${cssVars.gray200};
  `,

  ErrorText: styled.p`
    color: ${cssVars.colorDanger};
    font-size: 0.875rem;
    margin-top: 0.5rem;
  `,
};
