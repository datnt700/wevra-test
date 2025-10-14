import styled from '@emotion/styled';

export const WrapperStyled = styled.div<{
  isClickable?: boolean;
  hasUrl?: boolean;
}>`
  position: relative;
  display: flex;
  max-width: 100%;
  align-items: center;
  padding: 0.125rem 0.375rem;
  background-color: var(--light-7);
  border-radius: var(--border-radius-medium);
  color: var(--dark);
  width: max-content;
  cursor: ${({ isClickable, hasUrl }) => (isClickable || hasUrl ? 'pointer' : 'default')};

  ${({ isClickable }) =>
    isClickable &&
    `
    &:hover {
      background-color: var(--light-4);
    }
  `}

  ${({ hasUrl }) =>
    hasUrl &&
    `
    &:hover {
      background-color: var(--light-4);

      a.body {
        text-decoration: underline;
      }
    }
  `}
`;

export const BodyStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ContentStyled = styled.span`
  display: inline-flex;
`;
