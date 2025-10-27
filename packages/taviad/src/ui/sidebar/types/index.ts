export interface SidebarItem {
  label?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
  onClick?: () => void;
}
