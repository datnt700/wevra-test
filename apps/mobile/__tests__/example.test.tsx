import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('Example Test', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Text>Hello Eventure</Text>);
    expect(getByText('Hello Eventure')).toBeTruthy();
  });
});
