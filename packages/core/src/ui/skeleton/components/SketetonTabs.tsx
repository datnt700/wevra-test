import { Styled } from './Skeleton.styles';
import { SkeletonProps } from '../types';

export const SketetonTabs = ({ count = 2, hasAnimation = false, ...other }: SkeletonProps) => {
  return (
    <Styled.Tabs {...other}>
      {Array.from(Array(count), (_, i) => {
        return <Styled.Tab key={i} hasAnimation={hasAnimation}></Styled.Tab>;
      })}
    </Styled.Tabs>
  );
};
