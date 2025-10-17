/**
 * Tabs component
 * A tabbed interface built with Radix UI primitives
 * @module Tabs
 */
import { Styled } from './Tabs.styles';
import { TabsProps } from '../types';

/**
 * A reusable tabs component for organizing content into panels
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Horizontal and vertical orientations
 * - Keyboard navigation (arrows, Home, End)
 * - Disabled tab support
 * - Controlled and uncontrolled modes
 *
 * @example
 * ```tsx
 * // Basic tabs
 * <Tabs
 *   defaultValue="tab1"
 *   items={[
 *     { label: 'Overview', value: 'tab1', children: <div>Overview content</div> },
 *     { label: 'Details', value: 'tab2', children: <div>Details content</div> },
 *   ]}
 * />
 *
 * // Vertical tabs with disabled item
 * <Tabs
 *   orientation="vertical"
 *   defaultValue="settings"
 *   items={[
 *     { label: 'Settings', value: 'settings', children: <SettingsPanel /> },
 *     { label: 'Privacy', value: 'privacy', children: <PrivacyPanel />, isDisabled: true },
 *   ]}
 * />
 * ```
 */
export const Tabs = ({ items = [], ...other }: TabsProps) => {
  return (
    <Styled.Root {...other}>
      <Styled.List aria-label="Tabs">
        {items.map((item) => (
          <Styled.Trigger
            key={`trigger-${item.value}`}
            value={item.value}
            disabled={item.isDisabled}
          >
            {item.label}
          </Styled.Trigger>
        ))}
      </Styled.List>
      {items.map((item) => (
        <Styled.Content key={`content-${item.value}`} value={item.value}>
          {item.children}
        </Styled.Content>
      ))}
    </Styled.Root>
  );
};

Tabs.displayName = 'Tabs';
