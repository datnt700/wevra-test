/**
 * @fileoverview MenuBar component built with Radix UI primitives
 * Provides accessible navigation menu with keyboard support
 */

import { Styled } from './MenuBar.styles';
import { MenuBarProps } from '../types';

/**
 * MenuBar - Horizontal navigation menu with dropdown items
 *
 * @description
 * A fully accessible menu bar component built on Radix UI primitives.
 * Features:
 * - Horizontal menu layout with dropdown submenus
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Customizable menu positioning (top, right, bottom, left)
 * - Highlighted and disabled item states
 * - Automatic focus management
 *
 * Built with Radix UI for accessibility compliance (ARIA, keyboard navigation).
 *
 * @example
 * // Basic menu bar with two menus
 * ```tsx
 * const menuData = [
 *   {
 *     id: '1',
 *     label: 'File',
 *     items: [
 *       { id: '1-1', children: 'New File' },
 *       { id: '1-2', children: 'Open' },
 *       { id: '1-3', children: 'Save' },
 *     ],
 *   },
 *   {
 *     id: '2',
 *     label: 'Edit',
 *     items: [
 *       { id: '2-1', children: 'Undo' },
 *       { id: '2-2', children: 'Redo' },
 *     ],
 *   },
 * ];
 *
 * <MenuBar data={menuData} side="bottom" />
 * ```
 *
 * @example
 * // Menu with custom content (icons + text)
 * ```tsx
 * import { FileIcon, EditIcon } from 'lucide-react';
 *
 * const menuData = [
 *   {
 *     id: '1',
 *     label: 'File',
 *     items: [
 *       {
 *         id: '1-1',
 *         children: (
 *           <>
 *             <FileIcon size={14} />
 *             <span>New File</span>
 *           </>
 *         ),
 *       },
 *     ],
 *   },
 * ];
 *
 * <MenuBar data={menuData} side="bottom" />
 * ```
 *
 * @example
 * // Menu positioned on the right side
 * ```tsx
 * <MenuBar data={menuData} side="right" />
 * ```
 */
export const MenuBar = ({ data, side, ...other }: MenuBarProps) => {
  return (
    <Styled.Root {...other}>
      {data?.map((menu) => (
        <Styled.Menu key={menu.id}>
          <Styled.Trigger $state={menu.items ? 'open' : 'closed'}>{menu.label}</Styled.Trigger>
          {menu.items && (
            <Styled.Portal>
              <Styled.Content $side={side} align="start" sideOffset={5} alignOffset={-3}>
                {menu.items.map((item) => (
                  <Styled.Item key={item.id} data-testid="menu-item">
                    {item.children}
                  </Styled.Item>
                ))}
              </Styled.Content>
            </Styled.Portal>
          )}
        </Styled.Menu>
      ))}
    </Styled.Root>
  );
};

MenuBar.displayName = 'MenuBar';
