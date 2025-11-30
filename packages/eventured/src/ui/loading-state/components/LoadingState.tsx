import { Styled } from './LoadingState.styles';
import { Spinner } from '../../spinner';
import { LoadingStateProps } from '../types';

/**
 * A reusable LoadingState component designed to display loading states with optional title and subtitle.
 *
 * Features:
 * - Supports custom content via children prop that overrides default layout.
 * - Displays a spinner, title, and subtitle in a centered column layout.
 * - Styled using Emotion's `styled` API with theme tokens for modularity and reusability.
 * - Semantic HTML with h2 for title and h5 for subtitle.
 * - Uses primary color scheme for loading indication.
 *
 * Props:
 * - `children`: Optional custom content that overrides default layout.
 * - `title`: Main title text or ReactNode.
 * - `subTitle`: Optional subtitle text or ReactNode below the title.
 */
export const LoadingState = ({
  children,
  className: _className,
  wrapperClassName: _wrapperClassName,
  title,
  subTitle,
  ..._other
}: LoadingStateProps) => {
  return (
    <Styled.Wrapper>
      {children ? (
        <Styled.Body>{children}</Styled.Body>
      ) : (
        <Styled.Content>
          <div className="icon">
            <Spinner size="lg" />
          </div>
          <h2 className="title">{title}</h2>
          <h5 className="subTitle">{subTitle}</h5>
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
};

LoadingState.displayName = 'LoadingState';
