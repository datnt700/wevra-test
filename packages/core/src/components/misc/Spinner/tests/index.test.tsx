import { render } from '@testing-library/react';
import { Spinner } from './index';

describe('Icon', () => {
  it('renders icon', () => {
    render(<Spinner size="sm" />);
  });
});
