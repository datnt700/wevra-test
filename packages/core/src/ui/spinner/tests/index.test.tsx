import { render } from '@testing-library/react';
import { Spinner } from '..';

describe('Icon', () => {
  it('renders icon', () => {
    render(<Spinner size="sm" />);
  });
});
