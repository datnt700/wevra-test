import styled from '@emotion/styled';

const getBackgroundColor = ($variant?: string) => {
  switch ($variant) {
    case 'primary':
      return 'var(--main-color)';
    case 'secondary':
      return 'var(--light)';
    case 'dark':
      return 'var(--dark)';
    case 'danger':
      return 'var(--color-red)';
    case 'info':
      return 'var(--dark)';
    default:
      return 'transparent';
  }
};

const getContentColor = ($variant?: string) => {
  switch ($variant) {
    case 'primary':
      return 'var(--light)';
    case 'secondary':
      return 'var(--dark)';
    case 'dark':
      return 'var(--light)';
    case 'info':
      return 'var(--dark)';
    default:
      return 'inherit';
  }
};

export const Styled = {
  Button: styled.button<{
    $variant?: string;
    $shape?: string;
    $isLoading?: boolean;
  }>`
    color: ${({ $variant }) =>
      $variant === 'link' || $variant === 'tertiary' ? 'var(--dark)' : 'var(--light)'};
    text-decoration: ${({ $variant }) => ($variant === 'link' ? 'underline' : 'none')};
    padding: ${({ $shape }) => ($shape === 'iconOnly' ? '0' : '0.5rem 1rem')};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ $shape }) =>
      $shape === 'pill'
        ? '2.25rem'
        : $shape === 'round'
          ? 'var(--border-radius-large)'
          : 'var(--border-radius-medium)'};
    cursor: ${({ $isLoading }) => ($isLoading ? 'not-allowed' : 'pointer')};
    font-weight: 500;
    gap: 0.5rem;
    width: max-content;
    height: 3rem;
    transition:
      background-color 0.3s ease-out,
      transform 0.2s ease-in-out;
    background-color: ${({ $variant }) => getBackgroundColor($variant)};
    border: ${({ $variant }) => ($variant === 'secondary' ? '1px solid var(--dark)' : 'none')};

    &:active {
      transform: translate(2px, 2px);
    }

    &:disabled {
      background-color: var(--dark);
      opacity: 0.5;
      border: none;
    }

    .content {
      color: ${({ $variant }) => getContentColor($variant)};
      svg {
        color: ${({ $variant }) => getContentColor($variant)};
      }
    }
  `
};
