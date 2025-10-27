'use client';

/**
 * Link component - Styled anchor element with variants
 *
 * @example
 * // Basic usage
 * <Link url="https://example.com">Click here</Link>
 *
 * @example
 * // Monochrome variant (inherits color)
 * <Link url="/about" variant="monochrome">About</Link>
 *
 * @example
 * // Underlined link
 * <Link url="/contact" underlined>Contact Us</Link>
 */
import React from 'react';
import { Styled } from './Link.styles';
import { LinkProps } from '../types';

export const Link = ({
  id,
  url,
  children,
  target,
  className,
  underlined = false,
  variant = 'default',
  onClick,
  accessibilityLabel,
  ...other
}: LinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <Styled.Link
      id={id}
      href={url}
      aria-label={accessibilityLabel}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      $variant={variant}
      $underlined={underlined}
      className={className}
      onClick={handleClick}
      {...other}
    >
      {children}
    </Styled.Link>
  );
};

Link.displayName = 'Link';
