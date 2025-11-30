import { X } from 'lucide-react';
import { Icon } from '../../icon';
import { Styled } from './Tag.styles';
import type { TagProps } from '../types';

/**
 * Tag component - A compact label or badge with optional close button
 *
 * @example
 * // Basic tag
 * <Tag>Label</Tag>
 *
 * @example
 * // Clickable tag
 * <Tag onClick={() => console.log('clicked')}>Clickable</Tag>
 *
 * @example
 * // Tag with close button
 * <Tag hasClose onCloseClick={() => console.log('removed')}>Removable</Tag>
 *
 * @example
 * // Tag with URL
 * <Tag url="https://example.com">Link Tag</Tag>
 */
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
    <Styled.Wrapper
      $canClick={isClickable}
      $withUrl={hasUrl}
      className={wrapperClassName}
      onClick={() => onClick?.()}
      {...other}
    >
      {url ? (
        <a href={url} target="_blank" className={className} rel="noreferrer">
          <Styled.Body>
            <span>{children}</span>
            {hasClose ? (
              <Styled.CloseIcon onClick={onCloseClick}>
                <Icon source={<X width={16} height={16} />} />
              </Styled.CloseIcon>
            ) : null}
          </Styled.Body>
        </a>
      ) : (
        <Styled.Body className={className}>
          <span>{children}</span>
          {hasClose ? (
            <Styled.CloseIcon onClick={onCloseClick}>
              <Icon source={<X width={16} height={16} />} />
            </Styled.CloseIcon>
          ) : null}
        </Styled.Body>
      )}
    </Styled.Wrapper>
  );
};
