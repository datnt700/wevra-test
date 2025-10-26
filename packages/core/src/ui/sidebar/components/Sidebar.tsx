'use client';

/**
 * @file Sidebar component
 * @description A collapsible navigation sidebar with hover-to-expand behavior
 */

import { Styled } from './SideBar.styles';
import { useState } from 'react';
import { SidebarItem as SidebarItemType } from '../types';
import { SidebarItem } from './Item/Item';

/**
 * Props for the Sidebar component
 */
type SidebarProps = {
  /** Array of navigation items to display in the sidebar */
  items: SidebarItemType[];
};

/**
 * Sidebar component with collapsible navigation.
 *
 * @component
 * @example
 * // Basic sidebar with navigation items
 * <Sidebar
 *   items={[
 *     { label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
 *     { label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
 *   ]}
 * />
 *
 * @example
 * // Sidebar with nested items
 * <Sidebar
 *   items={[
 *     {
 *       label: 'Products',
 *       icon: <ProductIcon />,
 *       children: [
 *         { label: 'All Products', href: '/products' },
 *         { label: 'Add Product', href: '/products/new' },
 *       ],
 *     },
 *   ]}
 * />
 *
 * @param props - Component props
 * @param props.items - Navigation items to display
 * @returns A collapsible sidebar with hover-to-expand behavior
 */
export const Sidebar = ({ items }: SidebarProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Styled.Sidebar
      isOpen={isSidebarOpen}
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
    >
      <Styled.SidebarNav>
        <Styled.Logo>R</Styled.Logo>
        <Styled.TopSidebar>
          {items.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </Styled.TopSidebar>
      </Styled.SidebarNav>
    </Styled.Sidebar>
  );
};

Sidebar.displayName = 'Sidebar';
