import { render, screen } from '@testing-library/react';
import { InputNumber } from './InputNumber';

describe('Input Text', () => {
  it('renders children', () => {
    render(<InputNumber />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });
});
