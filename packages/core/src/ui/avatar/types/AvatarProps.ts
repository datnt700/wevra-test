/**
 * Avatar size variants.
 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Avatar color variants.
 */
export type AvatarColor = 'default' | 'primary' | 'success' | 'warning' | 'danger';

/**
 * Props for the Avatar component.
 */
export interface AvatarProps {
  /**
   * Custom CSS class for the avatar container.
   */
  className?: string;

  /**
   * Image source URL for the avatar.
   * If provided, displays an image. If loading fails, shows initials.
   */
  src?: string;

  /**
   * Alt text for the image (for accessibility).
   * Also used to generate fallback initials if image fails to load.
   */
  alt?: string;

  /**
   * Text label displayed when no image is provided.
   * Can be a full name or custom text.
   */
  label?: string;

  /**
   * Fallback text displayed if no image, label, or alt is available.
   * @default '?'
   */
  fallback?: string;

  /**
   * Size variant of the avatar.
   * - sm: 2rem (32px)
   * - md: 2.5rem (40px)
   * - lg: 3rem (48px)
   * - xl: 4rem (64px)
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Color variant of the avatar background.
   * @default 'default'
   */
  color?: AvatarColor;
}
