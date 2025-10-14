import { SidebarItem as SidebarItemType } from '../../types';
import { Popover as RadixPopover } from 'radix-ui';
import { useEffect, useState } from 'react';

import { Styled } from './Item.styles';

interface SidebarItemProps {
  item: SidebarItemType;
}

export const SidebarItem = ({ item }: SidebarItemProps) => {
  const [isInPopoverTrigger, setInPopoverTrigger] = useState(false);
  const [isInPopoverContent, setInPopoverContent] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleMouseEnterPopoverTrigger = () => {
    setInPopoverTrigger(true);
    setInPopoverContent(true);
  };

  const handleMouseLeavePopoverTrigger = () => {
    setInPopoverTrigger(false);
  };

  const handleMouseEnterPopoverContent = () => {
    setInPopoverContent(true);
  };

  const handleMouseLeavePopoverContent = () => {
    setInPopoverContent(false);
    setInPopoverTrigger(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setInPopoverTrigger(false);
      setInPopoverContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isInPopoverTrigger || isInPopoverContent) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isInPopoverTrigger, isInPopoverContent]);

  return (
    <RadixPopover.Root open={isOpen} onOpenChange={setOpen}>
      <RadixPopover.Trigger
        asChild
        onMouseEnter={handleMouseEnterPopoverTrigger}
        onMouseLeave={handleMouseLeavePopoverTrigger}
      >
        <li>
          <Styled.Item onClick={item.onClick}>{item.icon}</Styled.Item>
        </li>
      </RadixPopover.Trigger>
      {item.children ? (
        <RadixPopover.Portal>
          <RadixPopover.Content
            asChild
            sideOffset={5}
            side="right"
            onMouseEnter={handleMouseEnterPopoverContent}
            onMouseLeave={handleMouseLeavePopoverContent}
          >
            <Styled.PopoverContent>
              <Styled.PopoverContentMain>
                <ul>
                  {item.children.map((subMenuItem) => (
                    <Styled.PopoverItem key={subMenuItem.label}>
                      <Styled.PopoverItemLink onClick={subMenuItem.onClick}>
                        {subMenuItem.label}
                      </Styled.PopoverItemLink>
                    </Styled.PopoverItem>
                  ))}
                </ul>
              </Styled.PopoverContentMain>
            </Styled.PopoverContent>
          </RadixPopover.Content>
        </RadixPopover.Portal>
      ) : null}
    </RadixPopover.Root>
  );
};
