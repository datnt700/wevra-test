import { fireEvent, render, screen } from '@testing-library/react';
import { Badge } from '../index';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Hello</Badge>);
    const tagContent = screen.getByText(/Hello/i);
    expect(tagContent).toBeInTheDocument();
  });

  it('renders children with onClick', () => {
    const fn = vi.fn();

    render(<Badge onClick={fn}>Hello</Badge>);

    fireEvent(
      screen.getByText(/Hello/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(fn).toBeCalledTimes(1);
  });

  it('renders children with url', () => {
    render(<Badge url="https://www.revt.io">Hello</Badge>);

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://www.revt.io');
  });
});
