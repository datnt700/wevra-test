import styled from '@emotion/styled';

export const Styled = {
  self: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  `,
  main: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  `,
  progressBar: styled.div`
    width: 20rem;
    height: 0.5rem;
    border-radius: 6.405px;
    background: #d9d9d9;
  `,
  progress: styled.div`
    height: 0.5rem;
    border-radius: 6.405px;
    background: #868686;
    max-width: 20rem;
  `,
};
