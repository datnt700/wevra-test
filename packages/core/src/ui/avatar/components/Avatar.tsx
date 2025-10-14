/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { AvatarStyled, AvaImageStyled, AvaLabelStyled, FallbackStyled } from './Avatar.styles';
import { AvatarProps } from '../';

export const Avatar = ({ src, label, className }: AvatarProps) => {
  return (
    <AvatarStyled className={className}>
      <Image src={src} label={label} />
    </AvatarStyled>
  );
};

const Image = ({ src, label }: { src?: string; label: string }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  return isError ? (
    <Fallback text={label} />
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
        <AvaLabelStyled>{label}</AvaLabelStyled>
      )}
    </>
  );
};

const Fallback = ({ text }: { text?: string }) => {
  return <FallbackStyled>{text}</FallbackStyled>;
};

Avatar.displayName = 'Avatar';
