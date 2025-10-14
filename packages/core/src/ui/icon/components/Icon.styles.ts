import styled from '@emotion/styled';

export const Styled = {
  Wrapper: styled.div<{
    variant?:
      | 'base'
      | 'inherit'
      | 'primary'
      | 'info'
      | 'success'
      | 'caution'
      | 'warning'
      | 'danger';
  }>`
    width: max-content;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${({ variant }) =>
        variant === 'info'
          ? 'var(--color-blue)'
          : variant === 'danger'
            ? 'var(--color-red)'
            : 'inherit'};
    }
  `,
};
