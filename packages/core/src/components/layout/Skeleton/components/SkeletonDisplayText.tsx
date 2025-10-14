import { Styled } from './Skeleton.styles';
import { SkeletonDisplayTextProps } from '../types';

export const SkeletonDisplayText = ({
  width,
  height,
  hasAnimation = false
}: SkeletonDisplayTextProps) => {
  return (
    <Styled.Title
      hasAnimation={hasAnimation}
      style={{
        width,
        height
      }}
    />
  );
};
