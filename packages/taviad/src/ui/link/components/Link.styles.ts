'use client';

/**
 * Link styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Link.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

type LinkVariant = 'default' | 'monochrome';

interface StyledLinkProps {
  $variant?: LinkVariant;
  $underlined?: boolean;
}

/**
 * Get color styles based on link variant
 */
const getVariantStyles = (taviaTheme: TaviaTheme, variant: LinkVariant = 'default'): string => {
  const variantMap: Record<LinkVariant, string> = {
    default: `
      color: ${taviaTheme.colors.primary};

      &:hover {
        color: ${taviaTheme.colors.gray.mainColorDark};
        text-decoration: underline;
      }

      &:visited {
        color: ${taviaTheme.colors.gray.mainColorDark2};
      }
    `,
    monochrome: `
      color: inherit;

      &:hover {
        opacity: 0.8;
      }
    `,
  };

  return variantMap[variant];
};

/**
 * Styled link component
 * Uses transient props ($) to avoid DOM warnings
 */
const StyledLink = styled.a<StyledLinkProps>`
  ${({ theme, $variant = 'default', $underlined = false }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      /* Base styles */
      text-decoration: ${$underlined ? 'underline' : 'none'};
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      /* Variant styles */
      ${getVariantStyles(taviaTheme, $variant)}

      /* Focus state for accessibility */
      &:focus-visible {
        outline: 2px solid ${taviaTheme.colors.primary};
        outline-offset: 2px;
        border-radius: 2px;
      }

      /* Active state */
      &:active {
        opacity: 0.7;
      }
    `;
  }}
`;

export const Styled = {
  Link: StyledLink,
};
