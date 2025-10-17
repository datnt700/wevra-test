import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

/**
 * Styled components for the ErrorState.
 */
export const Styled = {
  Wrapper: styled.div`
    background-color: transparent;
    width: 100%;
    display: flex;
  `,

  Body: styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    .icon {
      margin-bottom: 2rem;
      color: ${cssVars.colorDanger};

      svg {
        width: 4rem;
        height: 4rem;
      }
    }

    .title {
      margin-bottom: 1rem;
      color: ${cssVars.gray900};
      font-weight: 600;
      text-align: center;
    }

    .subTitle {
      margin-bottom: 1rem;
      color: ${cssVars.gray600};
      font-weight: 400;
      text-align: center;
    }

    .action {
      margin-bottom: 1rem;
      color: ${cssVars.gray700};
    }
  `,
};
