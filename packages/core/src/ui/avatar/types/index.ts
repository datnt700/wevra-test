export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  className?: string;
  src?: string;
  label: string;
  size?: AvatarSize;
}
