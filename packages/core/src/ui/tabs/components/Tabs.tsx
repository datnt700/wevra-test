import { Styled } from './Tabs.styles';
import { TabsProps } from '../types';

export const Tabs = ({ ...other }: TabsProps) => {
  return <RadixTabs {...other} />;
};

const RadixTabs = ({ items = [], ...other }: TabsProps) => {
  return (
    <Styled.Root {...other}>
      <Styled.List>
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
