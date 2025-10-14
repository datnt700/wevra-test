import React from 'react';
import Styled from './Breadcrumb.styles';
import { BreadcrumbProps } from '../types';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Styled.Breadcrumb>
      {items.map((item, index) => (
        <Styled.BreadcrumbItem key={index} isLast={index === items.length - 1}>
          {item.href && index !== items.length - 1 ? (
            <Styled.BreadcrumbLink href={item.href}>{item.label}</Styled.BreadcrumbLink>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <Styled.BreadcrumbSeparator>/</Styled.BreadcrumbSeparator>}
        </Styled.BreadcrumbItem>
      ))}
    </Styled.Breadcrumb>
  );
};

export default Breadcrumb;
