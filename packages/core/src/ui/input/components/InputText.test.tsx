import { render, screen } from '@testing-library/react';
import { InputText } from './InputText';

describe('Input Text', () => {
  it('renders children', () => {
    render(<InputText />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders Input with hasClearButton', () => {
    render(<InputText hasClearButton />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  it('renders Input with error', () => {
    render(<InputText errorMessage="This is an error" />);
    const textErrorMessage = screen.getByText('This is an error');
    expect(textErrorMessage).toBeInTheDocument();
  });
});
