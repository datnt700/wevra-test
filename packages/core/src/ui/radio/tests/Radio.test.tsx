import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from '../components/Radio';
import { RadioGroup } from '../components/RadioGroup';

describe('Radio', () => {
  describe('Basic Rendering', () => {
    it('should render with label', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });
    });

    it('should render without label', () => {
      const { container: _container } = render(
        <RadioGroup>
          <Radio value="option1" />
        </RadioGroup>
      );
      expect(_container.firstChild).toBeInTheDocument();
    });

    it('should render with value attribute', () => {
      render(
        <RadioGroup>
          <Radio value="test-value" label="Test" />
        </RadioGroup>
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should render multiple radios', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
      });
    });
  });

  describe('Size Variants', () => {
    it('should render with sm size', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Small" size="sm" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Small')).toBeInTheDocument();
      });
    });

    it('should render with default size', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Default" size="default" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Default')).toBeInTheDocument();
      });
    });

    it('should render with md size', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Medium" size="md" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Medium')).toBeInTheDocument();
      });
    });

    it('should render with lg size', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Large" size="lg" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Large')).toBeInTheDocument();
      });
    });
  });

  describe('Disabled State', () => {
    it('should render with disabled state', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Disabled" isDisabled />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Disabled')).toBeInTheDocument();
      });
    });

    it('should not be selectable when disabled', async () => {
      const handleChange = vi.fn();
      render(
        <RadioGroup onValueChange={handleChange}>
          <Radio value="option1" label="Disabled" isDisabled />
        </RadioGroup>
      );

      await waitFor(() => {
        expect(screen.getByText('Disabled')).toBeInTheDocument();
      });

      const label = screen.getByText('Disabled');
      await userEvent.click(label);

      // Wait a bit to ensure no change happened
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should render enabled by default', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Enabled" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Enabled')).toBeInTheDocument();
      });
    });
  });

  describe('Required State', () => {
    it('should render with required state', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Required" isRequired />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Required')).toBeInTheDocument();
      });
    });

    it('should render without required by default', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Optional" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Optional')).toBeInTheDocument();
      });
    });
  });

  describe('Label Association', () => {
    it('should render label with radio', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" id="test-radio" label="Test Label" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Test Label')).toBeInTheDocument();
      });
    });

    it('should trigger radio when clicking button', async () => {
      const handleChange = vi.fn();
      render(
        <RadioGroup onValueChange={handleChange}>
          <Radio value="option1" label="Click me" />
        </RadioGroup>
      );

      // Click the radio button (not the label) to trigger onChange
      const radio = screen.getByRole('radio', { name: '' });
      await userEvent.click(radio);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('option1');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty value', () => {
      render(
        <RadioGroup>
          <Radio value="" label="Empty value" />
        </RadioGroup>
      );
      expect(screen.getByText('Empty value')).toBeInTheDocument();
    });

    it('should handle special characters in value', () => {
      render(
        <RadioGroup>
          <Radio value="test-value_123" label="Special" />
        </RadioGroup>
      );
      expect(screen.getByText('Special')).toBeInTheDocument();
    });

    it('should handle long labels', async () => {
      const longLabel = 'A'.repeat(100);
      render(
        <RadioGroup>
          <Radio value="option1" label={longLabel} />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText(longLabel)).toBeInTheDocument();
      });
    });

    it('should handle empty label', () => {
      const { container: _container } = render(
        <RadioGroup>
          <Radio value="option1" label="" />
        </RadioGroup>
      );
      expect(_container.firstChild).toBeInTheDocument();
    });

    it('should handle multiple radios with same size', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="First" size="lg" />
          <Radio value="option2" label="Second" size="lg" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('First')).toBeInTheDocument();
        expect(screen.getByText('Second')).toBeInTheDocument();
      });
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(Radio.displayName).toBe('Radio');
    });
  });
});

describe('RadioGroup', () => {
  describe('Basic Rendering', () => {
    it('should render with children', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
      });
    });

    it('should render without children', () => {
      const { container } = render(<RadioGroup />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render single child', async () => {
      render(
        <RadioGroup>
          <Radio value="only" label="Only Option" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Only Option')).toBeInTheDocument();
      });
    });

    it('should render multiple children', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });
    });
  });

  describe('Default Value', () => {
    it('should render with default value', () => {
      render(
        <RadioGroup defaultValue="option2">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should render without default value', () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('Value Change', () => {
    it('should call onValueChange when selection changes', async () => {
      const handleChange = vi.fn();
      render(
        <RadioGroup onValueChange={handleChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      // Click the first radio button directly
      const radios = screen.getAllByRole('radio');
      await userEvent.click(radios[0]!);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('option1');
      });
    });

    it('should handle multiple value changes', async () => {
      const handleChange = vi.fn();
      render(
        <RadioGroup onValueChange={handleChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      // Click the first radio button
      const radios = screen.getAllByRole('radio');
      await userEvent.click(radios[0]!);
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('option1');
      });

      // Click the second radio button
      await userEvent.click(radios[1]!);
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('option2');
      });
    });
  });

  describe('Orientation', () => {
    it('should render with horizontal orientation', () => {
      const { container } = render(
        <RadioGroup orientation="horizontal">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with vertical orientation', () => {
      const { container } = render(
        <RadioGroup orientation="vertical">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle many radio options', async () => {
      render(
        <RadioGroup>
          {Array.from({ length: 10 }, (_, i) => (
            <Radio key={i} value={`option${i}`} label={`Option ${i}`} />
          ))}
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Option 0')).toBeInTheDocument();
        expect(screen.getByText('Option 9')).toBeInTheDocument();
      });
    });

    it('should handle mixed disabled and enabled radios', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Enabled" />
          <Radio value="option2" label="Disabled" isDisabled />
          <Radio value="option3" label="Enabled 2" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Enabled')).toBeInTheDocument();
        expect(screen.getByText('Disabled')).toBeInTheDocument();
        expect(screen.getByText('Enabled 2')).toBeInTheDocument();
      });
    });

    it('should handle mixed sizes', async () => {
      render(
        <RadioGroup>
          <Radio value="option1" label="Small" size="sm" />
          <Radio value="option2" label="Large" size="lg" />
        </RadioGroup>
      );
      await waitFor(() => {
        expect(screen.getByText('Small')).toBeInTheDocument();
        expect(screen.getByText('Large')).toBeInTheDocument();
      });
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(RadioGroup.displayName).toBe('RadioGroup');
    });
  });
});
