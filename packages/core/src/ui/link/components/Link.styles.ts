/**
 * Link styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Link.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

type LinkVariant = 'default' | 'monochrome';

interface StyledLinkProps {
  $variant?: LinkVariant;
  $underlined?: boolean;
}

/**
 * Get color styles based on link variant
 */
const getVariantStyles = (variant: LinkVariant = 'default'): string => {
  const variantMap: Record<LinkVariant, string> = {
    default: `
      color: ${cssVars.mainColor};

      &:hover {
        color: ${cssVars.mainColorDark};
        text-decoration: underline;
      }

      &:visited {
        color: ${cssVars.mainColorDark2};
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
  ${({ $variant = 'default', $underlined = false }) => `
    /* Base styles */
    text-decoration: ${$underlined ? 'underline' : 'none'};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    /* Variant styles */
    ${getVariantStyles($variant)}

    /* Focus state for accessibility */
    &:focus-visible {
      outline: 2px solid ${cssVars.mainColor};
      outline-offset: 2px;
      border-radius: 2px;
    }

    /* Active state */
    &:active {
      opacity: 0.7;
    }
  `}
`;

export const Styled = {
  Link: StyledLink,
};
