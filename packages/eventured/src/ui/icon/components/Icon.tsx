/**
 * Icon component
 * A flexible icon wrapper that supports SVG strings or React elements
 * @module Icon
 */
import React from 'react';
import { Styled } from './Icon.styles';
import { IconProps } from '../types';

/**
 * A versatile icon component with variant support
 *
 * Features:
 * - Supports SVG strings or React icon components
 * - Multiple color variants (info, success, warning, danger, etc.)
 * - Flexible sizing via parent container
 * - Semantic color mapping
 *
 * @example
 * ```tsx
 * // With Lucide icon
 * import { Check } from 'lucide-react';
 * <Icon source={<Check size={24} />} variant="success" />
 *
 * // With SVG string
 * <Icon source="<svg>...</svg>" variant="primary" />
 *
 * // Inherit color from parent
 * <Icon source={<AlertCircle />} variant="inherit" />
 *
 * // Danger variant
 * <Icon source={<XCircle />} variant="danger" />
 * ```
 */
export const Icon = ({ source, variant, ...other }: IconProps) => {
  return (
    <Styled.Wrapper $variant={variant} {...other}>
      {typeof source === 'string' ? (
        <img src={'data:image/svg+xml;utf8,' + source} alt="" />
      ) : (
        <>{source}</>
      )}
    </Styled.Wrapper>
  );
};

Icon.displayName = 'Icon';
