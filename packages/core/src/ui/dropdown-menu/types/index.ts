import React from 'react';

export interface DropdownMenuItem {
  type?: 'item' | 'separator';
  isDisabled?: boolean;
  label?: React.ReactNode;
  onSelect?: (event: Event) => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items?: DropdownMenuItem[];
}
