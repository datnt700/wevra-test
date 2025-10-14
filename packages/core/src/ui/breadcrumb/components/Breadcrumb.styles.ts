/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const Styled = {
  Breadcrumb: styled.nav`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
  `,
  BreadcrumbItem: styled.div<{ isLast: boolean }>`
    display: flex;
    align-items: center;
    color: ${(props) => (props.isLast ? 'var(--dark)' : 'inherit')};
    font-weight: ${(props) => (props.isLast ? 'bold' : 'normal')};
  `,
  BreadcrumbLink: styled.a`
    text-decoration: none;
    color: var(--main-color);

    &:hover {
      text-decoration: underline;
    }
  `,
  BreadcrumbSeparator: styled.span`
    margin: 0 8px;
    color: #999;
  `,
};

export default Styled;
