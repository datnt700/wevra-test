/**
 * DropdownMenu component types
 * @module DropdownMenu.types
 */
import React from 'react';

/**
 * Dropdown menu item configuration
 */
export interface DropdownMenuItem {
  /**
   * Unique key for the item (used for React key prop)
   * If not provided, index will be used
   */
  key?: string;

  /**
   * Item type (currently only 'item' supported, 'separator' can be added)
   * @default 'item'
   */
  type?: 'item' | 'separator';

  /**
   * Whether the item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Label or content to display in the item
   */
  label?: React.ReactNode;

  /**
   * Optional icon to display before the label
   */
  icon?: React.ReactNode;

  /**
   * Callback when item is selected/clicked
   */
  onSelect?: (event: Event) => void;
}

/**
 * Props for DropdownMenu component
 */
export interface DropdownMenuProps {
  /**
   * Element that triggers the dropdown menu
   */
  trigger: React.ReactNode;

  /**
   * Array of menu items to display
   * @default []
   */
  items?: DropdownMenuItem[];
}
