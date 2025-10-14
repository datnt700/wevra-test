import styled from '@emotion/styled';

type Size = 'sm' | 'lg' | 'xxl';

export const sizes = {
  sm: {
    wrapperSize: '2rem',
    circleSize: '1.5rem',
    borderSize: '0.125rem'
  },
  lg: {
    wrapperSize: '4rem',
    circleSize: '3rem',
    borderSize: '0.25rem'
  },
  xxl: {
    wrapperSize: '8rem',
    circleSize: '6rem',
    borderSize: '0.5rem'
  }
};

export const SpinnerStyled = styled.div<{ size: Size }>`
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    ${({ size }) => `
      width: ${sizes[size].wrapperSize};
      height: ${sizes[size].wrapperSize};
    `}
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle {
    ${({ size }) => `
      width: ${sizes[size].circleSize};
      height: ${sizes[size].circleSize};
    `}
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before,
    &::after {
      content: ' ';
      position: absolute;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }

    &::before {
      ${({ size }) => `
        border-top: ${sizes[size].borderSize} solid var(--dark);
      `}
      animation: rotate1 2s linear infinite;
    }

    &::after {
      ${({ size }) => `
        border-top: ${sizes[size].borderSize} solid var(--main-color);
      `}
      animation: rotate1 2s linear reverse infinite;
      height: 80%;
      width: 80%;
    }
  }

  @keyframes rotate1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
