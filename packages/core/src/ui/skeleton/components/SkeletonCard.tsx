'use client';

import { Styled } from './Skeleton.styles';
import { SkeletonBodyText } from './SkeletonBodyText';
import { SkeletonDisplayText } from './SkeletonDisplayText';
import { SkeletonCardProps } from '../types';

export const SkeletonCard = ({ hasAnimation = false }: SkeletonCardProps) => {
  return (
    <Styled.SkeletonCardStyled>
      <Styled.SkeletonImageStyled hasAnimation={hasAnimation}></Styled.SkeletonImageStyled>
      <Styled.SkeletonCardContentStyled>
        <SkeletonDisplayText hasAnimation={hasAnimation} height="1.5rem" />
        <SkeletonBodyText hasAnimation={hasAnimation} rows={5} />
      </Styled.SkeletonCardContentStyled>
    </Styled.SkeletonCardStyled>
  );
};

SkeletonCard.displayName = 'SkeletonCard';
