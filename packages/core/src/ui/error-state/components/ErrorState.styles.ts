import styled from '@emotion/styled';

export const Styled = {
  Wrapper: styled.div`
    background-color: transparent;
  `,
  Body: styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    .icon {
      margin-bottom: 2rem;

      svg {
        width: 4rem;
        height: 4rem;
      }
    }

    .title {
      margin-bottom: 1rem;
    }

    .subTitle {
      margin-bottom: 1rem;
    }

    .action {
      margin-bottom: 1rem;
    }
  `,
};
