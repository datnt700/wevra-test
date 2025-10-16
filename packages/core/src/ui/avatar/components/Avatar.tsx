/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { AvatarStyled, AvaImageStyled, AvaLabelStyled, FallbackStyled } from './Avatar.styles';
import { AvatarProps } from '../';

/**
 * Avatar component for displaying user profile images or initials.
 *
 * @component
 * @example
 * // With image
 * <Avatar src="/user.jpg" label="John Doe" />
 *
 * @example
 * // With initials fallback
 * <Avatar label="John Doe" />
 *
 * @example
 * // Different sizes
 * <Avatar src="/user.jpg" label="John Doe" size="sm" />
 * <Avatar src="/user.jpg" label="John Doe" size="lg" />
 * <Avatar src="/user.jpg" label="John Doe" size="xl" />
 */
export const Avatar = ({ src, label, className, size = 'md' }: AvatarProps) => {
  return (
    <AvatarStyled className={className} $size={size}>
      <Image src={src} label={label} size={size} />
    </AvatarStyled>
  );
};

const Image = ({
  src,
  label,
  size = 'md',
}: {
  src?: string;
  label: string;
  size?: AvatarProps['size'];
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  return isError ? (
    <Fallback text={label} size={size} />
  ) : (
    <>
      <AvaImageStyled
        hidden
        src={src}
        alt={label}
        onLoad={() => setLoaded(true)}
        onError={() => setError('error')}
      />
      {isLoaded ? (
        <AvaImageStyled src={src} alt={label} />
      ) : (
        <AvaLabelStyled $size={size}>{label}</AvaLabelStyled>
      )}
    </>
  );
};

const Fallback = ({ text, size = 'md' }: { text?: string; size?: AvatarProps['size'] }) => {
  const initials = text
    ?.split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return <FallbackStyled $size={size}>{initials}</FallbackStyled>;
};

Avatar.displayName = 'Avatar';
