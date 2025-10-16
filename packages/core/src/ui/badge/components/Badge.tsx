import { WrapperStyled, BodyStyled, ContentStyled } from './Badge.styles';
import { BadgeProps } from '..';

export const Badge = ({
  children,
  onClick,
  url,
  className,
  wrapperClassName,
  ...other
}: BadgeProps) => {
  return (
    <WrapperStyled
      onClick={() => onClick?.()}
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
