import { render } from '@testing-library/react';
import { Link } from '../';

describe('Link', () => {
  it('renders Link', () => {
    const { container } = render(<Link url={'#'}>This is a link</Link>);
    const anchorElement = container.querySelector('a');
    expect(anchorElement).toBeInTheDocument();
  });
});
