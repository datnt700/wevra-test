import { Styled } from './Radio.styles';
import { RadioProps } from '../types';

export const Radio = ({ ...other }: RadioProps) => {
  return <RadixRadio {...other} />;
};

const RadixRadio = ({ id, size: _size = 'default', value, label, ...other }: RadioProps) => {
  return (
    <Styled.RadioWrapper>
      <Styled.RadioItem value={value} id={id} {...other}>
        <Styled.Indicator />
      </Styled.RadioItem>
      {label ? <Styled.Label htmlFor={id}>{label}</Styled.Label> : null}
    </Styled.RadioWrapper>
  );
};
