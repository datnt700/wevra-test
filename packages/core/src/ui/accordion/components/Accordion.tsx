/**
 * Accordion component
 * An expandable/collapsible content section using Radix UI primitives
 * @module Accordion
 */
import clsx from 'clsx';
import React from 'react';
import { AccordionContentProps, AccordionProps, AccordionTriggerProps } from '../types';
import { Styled } from './Accordion.styles';
import { Icon } from '../../icon';
import { ChevronDown } from 'lucide-react';

/**
 * A collapsible accordion component with Radix UI
 *
 * Features:
 * - Single or multiple item expansion
 * - Smooth slide animations
 * - Keyboard navigation support
 * - Disabled state support
 * - Chevron indicator rotation
 *
 * @example
 * ```tsx
 * // Single accordion (only one item open at a time)
 * <Accordion
 *   type="single"
 *   items={[
 *     {
 *       value: 'item-1',
 *       trigger: { content: 'Section 1' },
 *       content: { content: 'Content for section 1' }
 *     },
 *     {
 *       value: 'item-2',
 *       trigger: { content: 'Section 2' },
 *       content: { content: 'Content for section 2' }
 *     }
 *   ]}
 * />
 *
 * // Multiple accordion (multiple items can be open)
 * <Accordion
 *   type="multiple"
 *   items={[...]}
 * />
 *
 * // Disabled accordion
 * <Accordion
 *   isDisabled
 *   items={[...]}
 * />
 * ```
 */
export const Accordion = ({ ...other }: AccordionProps) => {
  return <Radix {...other} />;
};

Accordion.displayName = 'Accordion';

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

/**
 * AccordionTrigger - Internal trigger button component
 */
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

AccordionTrigger.displayName = 'AccordionTrigger';

/**
 * AccordionContent - Internal content container component
 */
const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Styled.Content className={clsx(className)} {...props} ref={forwardedRef}>
      <Styled.ContentText>{children}</Styled.ContentText>
    </Styled.Content>
  )
);

AccordionContent.displayName = 'AccordionContent';
