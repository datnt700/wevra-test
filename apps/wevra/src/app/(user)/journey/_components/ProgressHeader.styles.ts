/**
 * ProgressHeader Styles
 */

import styled from '@emotion/styled';
import type { TaviaTheme } from '@tavia/taviad';

export const Styled = {
  Header: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  LevelBadge: styled.div<{ $stage: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${({ $stage, theme }) => {
      const t = theme as TaviaTheme;
      switch ($stage) {
        case 'STARTER':
          return `linear-gradient(135deg, ${t.colors.success}, ${t.colors.successLight})`;
        case 'STABILIZER':
          return `linear-gradient(135deg, ${t.colors.info}, ${t.colors.infoLight})`;
        case 'BUILDER':
          return `linear-gradient(135deg, ${t.colors.warning}, ${t.colors.warningLight})`;
        case 'GROWER':
          return `linear-gradient(135deg, ${t.colors.danger}, ${t.colors.primary})`;
        default:
          return t.colors.success;
      }
    }};
    font-size: 2rem;
    font-weight: 700;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `,
  Title: styled.h1`
    font-size: 1.75rem;
    font-weight: 700;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.primary};
    margin: 0;
  `,
  Subtitle: styled.p`
    font-size: 1rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.secondary};
    margin: 0;
  `,
  XPBar: styled.div`
    width: 100%;
    height: 12px;
    background-color: ${(props) => (props.theme as TaviaTheme).colors.surface};
    border-radius: 999px;
    overflow: hidden;
  `,
  XPFill: styled.div<{ $percentage: number }>`
    height: 100%;
    width: ${({ $percentage }) => $percentage}%;
    background: linear-gradient(
      90deg,
      ${(props) => (props.theme as TaviaTheme).colors.success},
      ${(props) => (props.theme as TaviaTheme).colors.successLight}
    );
    transition: width 0.3s ease;
  `,
  XPText: styled.span`
    font-size: 0.875rem;
    color: ${(props) => (props.theme as TaviaTheme).colors.text.secondary};
    font-weight: 600;
  `,
};
