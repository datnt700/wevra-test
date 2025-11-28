import { WrapperStyled, BodyStyled, ContentStyled } from './Badge.styles';
import { BadgeProps } from '..';

/**
 * A compact Badge component for displaying labels, tags, or status indicators.
 *
 * Features:
 * - Interactive states with onClick handler support
 * - URL navigation with target="_blank"
 * - Hover and active state transitions
 * - Text truncation with ellipsis for long content
 * - Styled using Emotion's `styled` API with theme tokens for modularity and reusability.
 *
 * Props:
 * - `children`: Content to display in the badge (text, icons, or React nodes).
 * - `onClick`: Optional click handler making the badge interactive.
 * - `url`: Optional URL for navigation (opens in new tab).
 * - `className`: Custom CSS class for the body element.
 * - `wrapperClassName`: Custom CSS class for the wrapper element.
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  onClick,
  url,
  className,
  wrapperClassName,
  ...other
}: BadgeProps) => {
  return (
    <WrapperStyled
      onClick={() => onClick?.()}
      $variant={variant}
      $size={size}
      $isClickable={!!onClick}
      $hasUrl={!!url}
      className={wrapperClassName}
      {...other}
    >
      {url ? (
        <a href={url} target="_blank" rel="noreferrer">
          <BodyStyled className={className}>
            <ContentStyled>{children}</ContentStyled>
          </BodyStyled>
        </a>
      ) : (
        <BodyStyled className={className}>
          <ContentStyled>{children}</ContentStyled>
        </BodyStyled>
      )}
    </WrapperStyled>
  );
};

Badge.displayName = 'Badge';
