export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: React.ReactNode;
  fallback?: string;
  loading?: 'eager' | 'lazy';
  role?: 'image' | 'presentation';
  fit?: string;
  fallbackSrc?: string;
  className?: string;
  /** Enable image preview on click */
  preview?: boolean;
  /** Custom preview actions (download, zoom, etc.) */
  previewActions?: React.ReactNode;
}
