interface TabItem {
  value: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  isDisabled?: boolean;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  activationMode?: 'automatic' | 'manual';
  items: TabItem[];
}
