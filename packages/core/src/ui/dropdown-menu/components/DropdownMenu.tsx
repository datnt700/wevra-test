import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { Styled } from './DropdownMenu.styles';
import React from 'react';
import { DropdownMenuProps } from '../types';

export const DropdownMenu = ({ ...other }: DropdownMenuProps) => {
  return <Radix {...other} />;
};

const Radix = ({ items = [], trigger }: DropdownMenuProps) => {
  return (
    <Styled.Root>
      <Styled.Trigger asChild>{trigger}</Styled.Trigger>
      <RadixDropdownMenu.Portal>
        <Styled.Content sideOffset={5}>
          {items.map((item, index) => (
            <Styled.Item
              key={index}
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
