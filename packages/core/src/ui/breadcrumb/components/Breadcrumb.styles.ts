/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

const Styled = {
  Breadcrumb: styled.nav`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${cssVars.dark6};
  `,
  BreadcrumbItem: styled('div', {
    shouldForwardProp: (prop) => prop !== 'isLast',
  })<{ isLast: boolean }>`
    display: flex;
    align-items: center;
    color: ${(props) => (props.isLast ? cssVars.dark : 'inherit')};
    font-weight: ${(props) => (props.isLast ? 'bold' : 'normal')};
  `,
  BreadcrumbLink: styled.a`
    text-decoration: none;
    color: ${cssVars.mainColor};

    &:hover {
      text-decoration: underline;
    }
  `,
  BreadcrumbSeparator: styled.span`
    margin: 0 8px;
    color: ${cssVars.light5};
  `,
};

export default Styled;
