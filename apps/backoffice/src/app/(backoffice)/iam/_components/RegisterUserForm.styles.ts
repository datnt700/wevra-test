import styled from '@emotion/styled';
import NextLink from 'next/link';

export const Styled = {
  Container: styled.div`
    max-width: 600px;
    margin: 0 auto;
  `,

  Header: styled.div`
    margin-bottom: 2rem;
  `,

  BackLinkWrapper: styled.div`
    margin-bottom: 1rem;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;

      svg {
        flex-shrink: 0;
      }
    }
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

  CardContent: styled.div`
    padding: 2rem;

    @media (max-width: 640px) {
      padding: 1.5rem;
    }
  `,

  AlertWrapper: styled.div`
    margin-bottom: 1.5rem;
  `,

  FormFields: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;

    @media (max-width: 640px) {
      flex-direction: column;
    }
  `,

  LinkWrapper: styled(NextLink)`
    flex: 1;

    button {
      width: 100%;
    }
  `,

  SubmitButtonWrapper: styled.div`
    flex: 1;

    button {
      width: 100%;
    }
  `,
};
