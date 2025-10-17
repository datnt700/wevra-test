import { Styled } from './ErrorState.styles';
import { ErrorStateProps } from '../types';

/**
 * A reusable ErrorState component designed to display error states with optional icon, title, subtitle, and action.
 *
 * Features:
 * - Supports custom content via children prop that overrides default layout.
 * - Displays icon, title, subtitle, and action in a centered column layout.
 * - Styled using Emotion's `styled` API with theme tokens for modularity and reusability.
 * - Semantic HTML with h2 for title and h5 for subtitle/action.
 * - Uses danger color scheme for error indication.
 *
 * Props:
 * - `children`: Optional custom content that overrides default layout.
 * - `icon`: Optional icon to display above the title.
 * - `title`: Main title text or ReactNode.
 * - `subTitle`: Optional subtitle text or ReactNode below the title.
 * - `action`: Optional action button or component at the bottom.
 */
export const ErrorState = ({
  children,
  className: _className,
  wrapperClassName: _wrapperClassName,
  icon,
  title,
  subTitle,
  action,
  ..._other
}: ErrorStateProps) => {
  return (
    <Styled.Wrapper>
      {children ? (
        <Styled.Body>{children}</Styled.Body>
      ) : (
        <Styled.Content>
          <div className="icon">{icon}</div>
          <h2 className="title">{title}</h2>
          <h5 className="subTitle">{subTitle}</h5>
          <h5 className="action">{action}</h5>
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
};

ErrorState.displayName = 'ErrorState';
