import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('Example Test', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Text>Hello Tavia</Text>);
    expect(getByText('Hello Tavia')).toBeTruthy();
  });
});
