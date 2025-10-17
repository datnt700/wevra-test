export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarColor = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  label?: string;
  fallback?: string;
  size?: AvatarSize;
  color?: AvatarColor;
}
