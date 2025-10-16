import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import type { AvatarSize } from '../types';

interface AvatarStyledProps {
  $size?: AvatarSize;
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

export const AvatarStyled = styled.div<AvatarStyledProps>`
  ${({ $size = 'md' }) => {
    const styles = getSizeStyles($size);
    return `
      width: ${styles.size};
      height: ${styles.size};
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${cssVars.gray300};
      overflow: hidden;
      flex-shrink: 0;
    `;
  }}
`;

export const AvaImageStyled = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvaLabelStyled = styled.p<AvatarStyledProps>`
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

export const FallbackStyled = styled.div<AvatarStyledProps>`
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
