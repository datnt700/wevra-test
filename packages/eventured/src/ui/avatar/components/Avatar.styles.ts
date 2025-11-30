'use client';

import styled from '@emotion/styled';
import type { EventureTheme } from '../../../theme/theme';
import type { AvatarSize, AvatarColor } from '../types';

interface AvatarStyledProps {
  $size?: AvatarSize;
  $color?: AvatarColor;
}

interface SizeStyles {
  size: string;
  fontSize: string;
}

const getSizeStyles = (size: AvatarSize): SizeStyles => {
  const sizeMap: Record<AvatarSize, SizeStyles> = {
    sm: {
      size: '2rem', // 32px
      fontSize: '0.75rem', // 12px
    },
    md: {
      size: '2.5rem', // 40px
      fontSize: '0.875rem', // 14px
    },
    lg: {
      size: '3rem', // 48px
      fontSize: '1rem', // 16px
    },
    xl: {
      size: '4rem', // 64px
      fontSize: '1.25rem', // 20px
    },
  };

  return sizeMap[size];
};

const StyledAvatar = styled.div<AvatarStyledProps>`
  ${({ theme, $size = 'md', $color = 'default' }) => {
    const eventureTheme = theme as EventureTheme;
    const styles = getSizeStyles($size);
    const getBackgroundColor = () => {
      if ($color === 'primary') return eventureTheme.colors.gray.mainColorLight2;
      if ($color === 'success') return eventureTheme.colors.successLight;
      if ($color === 'warning') return eventureTheme.colors.warningLight;
      if ($color === 'danger') return eventureTheme.colors.dangerLight;
      return eventureTheme.colors.gray.light4;
    };

    const getColor = () => {
      if ($color === 'primary') return eventureTheme.colors.primary;
      if ($color === 'success') return eventureTheme.colors.success;
      if ($color === 'warning') return eventureTheme.colors.warning;
      if ($color === 'danger') return eventureTheme.colors.danger;
      return eventureTheme.colors.gray.dark3;
    };

    return `
      width: ${styles.size};
      height: ${styles.size};
      border-radius: ${eventureTheme.radii.full};
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: ${getBackgroundColor()};
      color: ${getColor()};
      font-weight: 500;
      user-select: none;
      flex-shrink: 0;
    `;
  }}
`;

const StyledImage = styled.img`
  ${({ theme }) => {
    const eventureTheme = theme as EventureTheme;
    return `
      width: 100%;
      height: 100%;
      border-radius: ${eventureTheme.radii.full};
      object-fit: cover;
    `;
  }}
`;

const StyledLabel = styled.p<AvatarStyledProps>`
  ${({ theme, $size = 'md' }) => {
    const eventureTheme = theme as EventureTheme;
    const styles = getSizeStyles($size);
    return `
      color: ${eventureTheme.colors.gray.dark3};
      font-size: ${styles.fontSize};
      font-weight: 500;
      margin: 0;
      text-align: center;
      user-select: none;
    `;
  }}
`;

const StyledFallback = styled.div<AvatarStyledProps>`
  ${({ theme, $size = 'md' }) => {
    const eventureTheme = theme as EventureTheme;
    const styles = getSizeStyles($size);
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: ${eventureTheme.colors.gray.light4};
      color: ${eventureTheme.colors.gray.dark3};
      font-size: ${styles.fontSize};
      font-weight: 500;
      text-transform: uppercase;
    `;
  }}
`;

export const Styled = {
  Avatar: StyledAvatar,
  Image: StyledImage,
  Label: StyledLabel,
  Fallback: StyledFallback,
};
