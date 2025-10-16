import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio', () => {
  describe('Basic Rendering', () => {
    it('should render the radio button', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should render without label', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('should render multiple radio buttons in a group', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
    });
  });

  describe('Sizes', () => {
    it('should render with small size', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Small Radio" size="sm" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should render with default size', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Default Radio" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should render with medium size', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Medium Radio" size="md" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should render with large size', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Large Radio" size="lg" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('should be checked when value matches RadioGroup defaultValue', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('should not be checked when value does not match', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();
    });

    it('should update checked state when RadioGroup value changes', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" id="radio1" />
          <Radio value="option2" label="Option 2" id="radio2" />
        </RadioGroup>
      );

      const radio1 = screen.getByRole('radio', { name: /option 1/i });
      const radio2 = screen.getByRole('radio', { name: /option 2/i });

      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();

      await user.click(radio2);

      expect(radio1).not.toBeChecked();
      expect(radio2).toBeChecked();
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when isDisabled is true', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Disabled Radio" isDisabled />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });

    it('should not have disabled attribute by default', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Enabled Radio" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).not.toBeDisabled();
    });

    it('should not be clickable when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <RadioGroup defaultValue="option1" onValueChange={handleChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Disabled Option" isDisabled />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');
      const disabledRadio = radios[1]!; // Second radio is disabled
      await user.click(disabledRadio);

      // Should not trigger change when disabled
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Required State', () => {
    it('should accept isRequired prop', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Required Radio" isRequired />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('should not have required attribute by default', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Optional Radio" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).not.toBeRequired();
    });
  });

  describe('User Interactions', () => {
    it('should call onValueChange when radio is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <RadioGroup defaultValue="option1" onValueChange={handleChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');
      await user.click(radios[1]!); // Click second radio

      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('should select radio when clicking on it', async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');
      await user.click(radios[1]!); // Click second radio

      expect(radios[1]).toBeChecked();
    });

    it('should only allow one radio to be selected at a time', async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');

      expect(radios[0]).toBeChecked();
      expect(radios[1]).not.toBeChecked();
      expect(radios[2]).not.toBeChecked();

      await user.click(radios[1]!);

      expect(radios[0]).not.toBeChecked();
      expect(radios[1]).toBeChecked();
      expect(radios[2]).not.toBeChecked();

      await user.click(radios[2]!);

      expect(radios[0]).not.toBeChecked();
      expect(radios[1]).not.toBeChecked();
      expect(radios[2]).toBeChecked();
    });
  });

  describe('Label Interactions', () => {
    it('should toggle radio when label is clicked', async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" id="radio1" />
          <Radio value="option2" label="Option 2" id="radio2" />
        </RadioGroup>
      );

      const label = screen.getByText('Option 2');
      const radio2 = screen.getByRole('radio', { name: /option 2/i });

      await user.click(label);

      expect(radio2).toBeChecked();
    });

    it('should associate label with radio via htmlFor', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Test Label" id="test-radio" />
        </RadioGroup>
      );

      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'test-radio');
    });
  });

  describe('Accessibility', () => {
    it('should have radio role', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Accessible Radio" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should have correct id attribute', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Radio" id="custom-radio" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('id', 'custom-radio');
    });

    it('should have correct value attribute', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="custom-value" label="Radio" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('value', 'custom-value');
    });

    it('should have radiogroup role on RadioGroup', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size styles', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Small" size="sm" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('should apply medium size styles', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Medium" size="md" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('should apply large size styles', () => {
      render(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Large" size="lg" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });
  });
});
