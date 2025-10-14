import styled from '@emotion/styled';

export const AvatarStyled = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%; /* make circle */
  background-size: cover; /* Make sure the image is full size */
  background-position: center; /* Center the image */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--dark);
`;

export const AvaImageStyled = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%; /* make circle */
`;

export const AvaImgNoneStyled = styled.img`
  display: none;
`;

export const AvaLabelStyled = styled.p`
  color: var(--dark);
`;

export const FallbackStyled = styled.div``;
