import styled from '@emotion/styled';

const SkeletonBox = styled.div<{ width?: string; height?: string; $circle?: boolean }>`
  background-color: #e0e0e0;
  border-radius: ${({ $circle }) => ($circle ? '50%' : '8px')};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '20px'};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const ImageSkeleton = styled(SkeletonBox)`
  width: 100%;
  height: 200px;
  border-radius: 12px 12px 0 0;
`;

export const Styled = {
  SkeletonBox,
  ImageSkeleton,
};
