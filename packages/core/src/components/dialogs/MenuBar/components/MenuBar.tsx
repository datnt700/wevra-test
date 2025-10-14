import { Styled } from './MenuBar.styles';
import { MenuBarProps } from '../types';

/**
 * A reusable MenuBar component built with Radix UI primitives.
 *
 * Features:
 * - Displays a collection of menus with triggers and items.
 * - Supports dynamic alignment of the menu content based on the `side` prop.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Props:
 * - `data`: An array of menu items, where each item contains a label and sub-items.
 * - `side`: The side on which the menu content should appear (`top`, `right`, `bottom`, `left`).
 */
export const MenuBar = ({ data, side, ...other }: MenuBarProps): JSX.Element => {
  return (
    <Styled.Root {...other}>
      {data?.map((menu) => (
        <Styled.Menu key={menu.id}>
          <Styled.Trigger $state={menu.items ? 'open' : 'closed'}>{menu.label}</Styled.Trigger>
          {menu.items && (
            <Styled.Portal>
              <Styled.Content $side={side} align="start" sideOffset={5} alignOffset={-3}>
                {menu.items.map((item) => (
                  <Styled.Item
                    key={item.id}
                    $highlighted={false}
                    $disabled={false}
                    data-testid="menu-item"
                  >
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
