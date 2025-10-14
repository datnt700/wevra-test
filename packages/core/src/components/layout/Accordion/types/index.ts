import { ReactNode } from 'react';

export interface AccordionProps {
  type?: 'single';
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  collapsible?: boolean;
  isDisabled?: boolean;
  dir?: 'ltr' | 'rtl';
  orientation?: 'horizontal' | 'vertical';
  items?: AccordionItem[];
}

export interface AccordionItem {
  isDisabled?: boolean;
  value: string;
  trigger?: {
    content?: ReactNode;
    className?: string;
  };
  content?: {
    content?: ReactNode;
    className?: string;
  };
}

export interface AccordionTriggerProps {
  children?: ReactNode;
  className?: string;
}

export interface AccordionContentProps {
  children?: ReactNode;
  className?: string;
}
