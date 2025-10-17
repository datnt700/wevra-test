import { Styled } from './Avatar.styles';
import type { AvatarProps } from '../types';

/**
 * Avatar component - Displays user profile images or fallback initials
 *
 * @example
 * // With image
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 *
 * @example
 * // With fallback label
 * <Avatar label="JD" />
 *
 * @example
 * // Different sizes
 * <Avatar src="/avatar.jpg" size="sm" />
 * <Avatar src="/avatar.jpg" size="lg" />
 */
export const Avatar = ({
  src,
  alt,
  label,
  fallback,
  size = 'md',
  color = 'default',
  ...other
}: AvatarProps) => {
  // Use alt if provided, otherwise use label as alt text for accessibility
  const imageAlt = alt || label || '';

  return (
    <Styled.Avatar $size={size} $color={color} {...other}>
      {src ? (
        <Styled.Image src={src} alt={imageAlt} />
      ) : label ? (
        <Styled.Label $size={size}>{label}</Styled.Label>
      ) : (
        <Styled.Fallback $size={size}>{fallback || '?'}</Styled.Fallback>
      )}
    </Styled.Avatar>
  );
};

Avatar.displayName = 'Avatar';
