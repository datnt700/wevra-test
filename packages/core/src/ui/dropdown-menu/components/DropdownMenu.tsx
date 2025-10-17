/**
 * DropdownMenu component
 * A dropdown menu built with Radix UI primitives
 * @module DropdownMenu
 */
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { Styled } from './DropdownMenu.styles';
import { DropdownMenuProps } from '../types';

/**
 * A reusable dropdown menu component for action lists
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Keyboard navigation (arrows, Enter, Escape)
 * - Optional arrow pointing to trigger
 * - Disabled item support
 * - Custom trigger element
 *
 * @example
 * ```tsx
 * // Basic dropdown menu
 * <DropdownMenu
 *   trigger={<button>Options</button>}
 *   items={[
 *     { label: 'Edit', onSelect: () => console.log('Edit') },
 *     { label: 'Delete', onSelect: () => console.log('Delete') },
 *   ]}
 * />
 *
 * // With disabled items
 * <DropdownMenu
 *   trigger={<button>Actions</button>}
 *   items={[
 *     { label: 'Save', onSelect: handleSave },
 *     { label: 'Archive', onSelect: handleArchive, isDisabled: true },
 *   ]}
 * />
 * ```
 */
export const DropdownMenu = ({ items = [], trigger }: DropdownMenuProps) => {
  return (
    <Styled.Root>
      <Styled.Trigger asChild>{trigger}</Styled.Trigger>
      <RadixDropdownMenu.Portal>
        <Styled.Content sideOffset={5}>
          {items.map((item, index) => (
            <Styled.Item
              key={item.key ?? index}
              disabled={item.isDisabled}
              onSelect={(e) => item?.onSelect?.(e)}
            >
              {item.label}
            </Styled.Item>
          ))}
          <Styled.Arrow />
        </Styled.Content>
      </RadixDropdownMenu.Portal>
    </Styled.Root>
  );
};

DropdownMenu.displayName = 'DropdownMenu';
