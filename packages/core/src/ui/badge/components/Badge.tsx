/** @jsxImportSource @emotion/react */
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
      isClickable={!!onClick}
      hasUrl={!!url}
      className={wrapperClassName}
      {...other}
    >
      {url ? (
        <a href={url} target="_blank" className={className}>
          <BodyStyled className="body">
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
