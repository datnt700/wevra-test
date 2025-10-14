import React from 'react';
import { LinkStyled } from './Link.styles';
import { LinkProps } from '../types';

export const Link = ({
  id,
  url,
  children,
  target,
  className,
  undelined,
  type = 'default',
  onClick,
  accessibilityLabel,
  ...other
}: LinkProps) => {
  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <LinkStyled
      id={id}
      href={url}
      aria-label={accessibilityLabel}
      target={target}
      type={type}
      undelined={undelined}
      className={className}
      onClick={onLinkClick}
      {...other}
    >
      {children}
    </LinkStyled>
  );
};
