import styled from '@emotion/styled';
import { RadioGroup } from 'radix-ui';

export const Styled = {
  RadioWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,

  RadioItem: styled(RadioGroup.Item)`
    background-color: var(--light);
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 100%;
    border: 1px solid var(--dark);

    &:hover {
      background-color: var(--main-color);
    }
  `,

  Indicator: styled(RadioGroup.Indicator)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background-color: var(--main-color);
    }
  `,

  Label: styled.label`
    color: var(--dark);
    font-size: 1rem;
    line-height: 1;
  `,
};
