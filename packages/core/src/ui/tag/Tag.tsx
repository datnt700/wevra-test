import { X } from 'lucide-react';
import { Icon } from '../icon';
import { tagStyles } from './Tag.styles';
import clsx from 'clsx';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  onClick?: () => void;
  url?: string;
  hasClose?: boolean;
  onCloseClick?: () => void;
}

export const Tag = ({
  children,
  onClick,
  url,
  className,
  wrapperClassName,
  hasClose,
  onCloseClick,
  ...other
}: TagProps) => {
  const isClickable = !!onClick;
  const hasUrl = !!url;

  return (
    <div
      css={tagStyles.wrapper}
      className={clsx({ canClick: isClickable, withUrl: hasUrl }, wrapperClassName)}
      onClick={() => onClick?.()}
      {...other}
    >
      {url ? (
        <a href={url} target="_blank" css={tagStyles.body} className={className}>
          <span>{children}</span>
          {hasClose ? (
            <Icon
              source={<X width={16} height={16} css={tagStyles.closeIcon} onClick={onCloseClick} />}
            />
          ) : null}
        </a>
      ) : (
        <div css={tagStyles.body} className={className}>
          <span>{children}</span>
          {hasClose ? (
            <Icon
              source={<X width={16} height={16} css={tagStyles.closeIcon} onClick={onCloseClick} />}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
