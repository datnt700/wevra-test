import { Styled } from './ProgressBar.styles';
import { ProgressBarProps } from '../types';

export const ProgressBar = ({
  progress,
  hasLabel,
  variant = 'default',
  isIndeterminate = false,
}: ProgressBarProps) => {
  return (
    <Styled.Wrapper
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
      aria-valuenow={progress}
      data-max="100"
      aria-valuetext={`${progress}%`}
    >
      <Styled.Bar>
        <Styled.Progress
          variant={variant}
          isIndeterminate={isIndeterminate}
          style={{
            transform: `translateX(${progress}%)`,
            transition: progress! > 0 && progress! < 105 ? `transform linear 0.5s` : 'none',
          }}
        />
      </Styled.Bar>
      {hasLabel && <p>{progress}% Complete</p>}
    </Styled.Wrapper>
  );
};

ProgressBar.displayName = 'ProgressBar';
