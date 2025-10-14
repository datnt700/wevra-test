/** @jsxImportSource @emotion/react */
import { Styled } from './Skeleton.styles';
import { SkeletonBodyTextProps } from '../types';

export const SkeletonBodyText = ({ rows = 3, hasAnimation = false }: SkeletonBodyTextProps) => {
  return (
    <Styled.SkeletonBodyTextStyled>
      {Array.from({ length: rows }, (_, i) => (
        <Styled.Row key={i} hasAnimation={hasAnimation} />
      ))}
    </Styled.SkeletonBodyTextStyled>
  );
};
