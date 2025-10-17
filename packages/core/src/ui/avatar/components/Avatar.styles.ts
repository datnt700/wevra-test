import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';
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
  ${({ $size = 'md', $color = 'default' }) => {
    const styles = getSizeStyles($size);
    const getBackgroundColor = () => {
      if ($color === 'primary') return cssVars.mainColorLight2;
      if ($color === 'success') return cssVars.colorSuccessLight;
      if ($color === 'warning') return cssVars.colorWarningLight;
      if ($color === 'danger') return cssVars.colorDangerLight;
      return cssVars.gray300;
    };

    const getColor = () => {
      if ($color === 'primary') return cssVars.mainColor;
      if ($color === 'success') return cssVars.colorSuccess;
      if ($color === 'warning') return cssVars.colorWarning;
      if ($color === 'danger') return cssVars.colorDanger;
      return cssVars.gray700;
    };

    return `
      width: ${styles.size};
      height: ${styles.size};
      border-radius: ${radii.full};
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
  width: 100%;
  height: 100%;
  border-radius: ${radii.full};
  object-fit: cover;
`;

const StyledLabel = styled.p<AvatarStyledProps>`
  ${({ $size = 'md' }) => {
    const styles = getSizeStyles($size);
    return `
      color: ${cssVars.gray700};
      font-size: ${styles.fontSize};
      font-weight: 500;
      margin: 0;
      text-align: center;
      user-select: none;
    `;
  }}
`;

const StyledFallback = styled.div<AvatarStyledProps>`
  ${({ $size = 'md' }) => {
    const styles = getSizeStyles($size);
    return `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: ${cssVars.gray200};
      color: ${cssVars.gray700};
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
