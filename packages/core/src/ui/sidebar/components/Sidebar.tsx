import { Styled } from './SideBar.styles';
import { useState } from 'react';
import { SidebarItem as SidebarItemType } from '../types';
import { SidebarItem } from './Item/Item';

type SidebarProps = {
  items: SidebarItemType[];
};

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
