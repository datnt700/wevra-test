'use client';

import styled from '@emotion/styled';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';

export const StyledRadioGroupRoot = styled(RadixRadioGroup.Root)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  &[data-orientation='horizontal'] {
    flex-direction: row;
  }
`;
