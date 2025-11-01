import styled from '@emotion/styled';
import { Link } from '@tavia/taviad';

/**
 * Styled components for TopBar
 */
export const Styled = {
  Wrapper: styled.div`
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    padding: 0.5rem 0;
  `,

  Content: styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  `,

  Link: styled(Link)`
    font-size: 0.875rem;
    color: #495057;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
  `,
};
