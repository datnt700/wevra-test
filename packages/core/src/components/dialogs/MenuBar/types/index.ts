import { ReactNode } from 'react';

/**
 * Props for the MenuBar component.
 */
export interface MenuBarProps {
  /**
   * An array of menu items, where each item contains a label and sub-items.
   */
  data: MenuBarItem[];

  /**
   * The side on which the menu content should appear (`top`, `right`, `bottom`, `left`).
   * - Default: 'bottom'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * Interface for individual menu bar items.
 */
interface MenuBarItem {
  id: string;

  /**
   * The label or title of the menu item.
   */
  label: ReactNode;

  /**
   * An array of sub-items for the menu.
   */
  items?: { id: string; children: ReactNode; disabled?: boolean }[];
}
