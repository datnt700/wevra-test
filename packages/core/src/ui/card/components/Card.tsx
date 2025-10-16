import React from 'react';
import { Styled } from './Card.styles';
import { CardProps } from '../types';

/**
 * Card component for containing and organizing content.
 *
 * @component
 * @example
 * // Basic card with content
 * <Card>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * @example
 * // Card with header
 * <Card header="Card Title">
 *   <p>Card body content</p>
 * </Card>
 *
 * @example
 * // Different variants
 * <Card variant="elevated">Elevated with shadow</Card>
 * <Card variant="outlined">Outlined with border</Card>
 * <Card variant="flat">Flat with no border or shadow</Card>
 */
export const Card = ({
  children,
  className,
  header,
  wrapperClassName,
  variant = 'elevated',
  ...other
}: CardProps) => {
  return (
    <Styled.Wrapper className={wrapperClassName} $variant={variant} {...other}>
      {header && <Styled.Header>{header}</Styled.Header>}
      <Styled.Body className={className}>{children}</Styled.Body>
    </Styled.Wrapper>
  );
};
