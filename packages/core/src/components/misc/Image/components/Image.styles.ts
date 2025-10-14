import styled from '@emotion/styled';

export const ImageWrapperStyled = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
`;

export const ImageStyled = styled.img<{ isVisible: boolean }>`
  width: 100%;
  height: auto;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  transition: opacity 0.3s ease;
`;

export const PlaceholderStyled = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  height: 100%;
`;
