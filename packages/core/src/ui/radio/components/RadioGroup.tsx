/** @jsxImportSource @emotion/react */
import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { RadioGroupStyles as styles } from './RadioGroup.styles';
import { RadioGroupProps } from '../types';

export const RadioGroup = ({ defaultValue, children, ...other }: RadioGroupProps) => {
  return (
    <RadixRadioGroup.Root
      css={styles.root}
      defaultValue={defaultValue}
      aria-label="View density"
      {...other}
    >
      {children}
    </RadixRadioGroup.Root>
  );
};
