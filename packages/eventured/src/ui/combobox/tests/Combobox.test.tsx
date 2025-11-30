import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the Popover used by Combobox so we don't trigger portal/async behavior in jsdom
vi.mock('../../popover', () => ({
  Popover: ({ trigger, children }: any) => (
    <div data-testid="mock-popover">
      <div data-testid="mock-popover-trigger">{trigger}</div>
      <div data-testid="mock-popover-children">{children}</div>
    </div>
  ),
}));

import { Combobox } from '../components/Combobox';

describe('Combobox (simplified)', () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  it('renders input and placeholder', () => {
    render(<Combobox options={options} placeholder="Search" />);
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('renders all provided options by default', () => {
    render(<Combobox options={options} placeholder="Search" />);
    // All options are rendered inside the mocked popover children synchronously
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn((_: any) => {});
    render(<Combobox options={options} placeholder="Search" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Search');

    await user.type(input, 'ban');
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows clear button when value prop is provided and hasClearButton is true', () => {
    // Provide a value prop so the component renders the clear button
    render(<Combobox options={options} placeholder="Search" value="ban" hasClearButton />);

    const trigger = screen.getByTestId('mock-popover-trigger');
    // The clear button is rendered inside the trigger area; find a button there
    const clearBtn = within(trigger).getByRole('button');
    expect(clearBtn).toBeInTheDocument();
  });

  it('does not show clear button when isDisabled is true', () => {
    render(
      <Combobox options={options} placeholder="Search" value="ban" hasClearButton isDisabled />
    );

    const trigger = screen.getByTestId('mock-popover-trigger');
    const buttons = within(trigger).queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('does not show clear button when isReadOnly is true', () => {
    render(
      <Combobox options={options} placeholder="Search" value="ban" hasClearButton isReadOnly />
    );

    const trigger = screen.getByTestId('mock-popover-trigger');
    const buttons = within(trigger).queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('renders with success variant', () => {
    const { container } = render(
      <Combobox options={options} placeholder="Search" variant="success" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with danger variant when errorMessage is provided', () => {
    render(
      <Combobox options={options} placeholder="Search" errorMessage="This field is required" />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<Combobox options={options} placeholder="Search" isDisabled />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('renders in readOnly state', () => {
    render(<Combobox options={options} placeholder="Search" isReadOnly />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
