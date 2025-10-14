export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  onClick?: () => void;
  url?: string;
}
