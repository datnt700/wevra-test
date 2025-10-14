import clsx from 'clsx';
import React from 'react';
import { AccordionContentProps, AccordionProps, AccordionTriggerProps } from '../types';
import { Styled } from './Accordion.styles';
import { Icon } from '../../../misc/Icon/components/Icon';
import { ChevronDown } from 'lucide-react';

export const Accordion = ({ ...other }: AccordionProps) => {
  return <Radix {...other} />;
};

const Radix = ({ items = [], type = 'single', isDisabled, ...other }: AccordionProps) => {
  return (
    <Styled.Root type={type} defaultValue="item-1" collapsible disabled={isDisabled} {...other}>
      {items.map((item) => (
        <Styled.Item key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger?.content}</AccordionTrigger>
          <AccordionContent>{item.content?.content}</AccordionContent>
        </Styled.Item>
      ))}
    </Styled.Root>
  );
};

interface ExtendedAccordionTriggerProps extends AccordionTriggerProps {
  'data-state'?: 'open' | 'closed';
}

// AccordionTrigger
const AccordionTrigger = React.forwardRef<HTMLButtonElement, ExtendedAccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const isOpen = (props as any)['data-state'] === 'open';

    return (
      <Styled.Header>
        <Styled.Trigger className={clsx(className)} {...props} ref={forwardedRef}>
          {children}
          <Styled.ChevronIcon data-state={isOpen ? 'open' : 'closed'}>
            <Icon source={<ChevronDown />} />
          </Styled.ChevronIcon>
        </Styled.Trigger>
      </Styled.Header>
    );
  }
);

// AccordionContent
const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Styled.Content className={clsx(className)} {...props} ref={forwardedRef}>
      <Styled.ContentText>{children}</Styled.ContentText>
    </Styled.Content>
  )
);
