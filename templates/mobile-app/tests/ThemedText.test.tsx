import { render } from '@testing-library/react-native';
import { ThemedText } from '@/components/ThemedText';

describe('ThemedText', () => {
  it('should render with default props', () => {
    const { getByText } = render(<ThemedText>Hello Eventure</ThemedText>);
    expect(getByText('Hello Eventure')).toBeTruthy();
  });

  it('should render title type', () => {
    const { getByText } = render(<ThemedText type="title">Welcome</ThemedText>);
    const element = getByText('Welcome');
    expect(element).toBeTruthy();
  });

  it('should render subtitle type', () => {
    const { getByText } = render(<ThemedText type="subtitle">Subtitle</ThemedText>);
    expect(getByText('Subtitle')).toBeTruthy();
  });

  it('should render link type', () => {
    const { getByText } = render(<ThemedText type="link">Click here</ThemedText>);
    expect(getByText('Click here')).toBeTruthy();
  });
});
