export interface MenuItem {
  id?: string;
  type?: string;
  label: string;
  link?: string;
  subItems?: MenuItem[];
  target?: string;
  active?: boolean;
}
