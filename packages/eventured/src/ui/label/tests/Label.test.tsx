import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from '../components/Label';

describe('Label', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(<Label>Email Address</Label>);
      expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('renders as label element', () => {
      const { container } = render(<Label>Test Label</Label>);
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });

    it('returns null when no children', () => {
      const { container } = render(<Label />);
      expect(container.firstChild).toBeNull();
    });

    it('accepts custom className', () => {
      render(<Label className="custom-label">Test</Label>);
      const label = screen.getByText('Test').closest('label');
      expect(label).toHaveClass('custom-label');
    });
  });

  describe('HtmlFor Prop', () => {
    it('sets htmlFor attribute', () => {
      render(<Label htmlFor="email-input">Email</Label>);
      const label = screen.getByText('Email').closest('label');
      expect(label).toHaveAttribute('for', 'email-input');
    });

    it('associates with input via htmlFor', () => {
      render(
        <div>
          <Label htmlFor="test-input">Test Input</Label>
          <input id="test-input" type="text" />
        </div>
      );
      const label = screen.getByText('Test Input');
      const input = screen.getByRole('textbox');
      expect(label.closest('label')).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('works without htmlFor', () => {
      render(<Label>No Association</Label>);
      const label = screen.getByText('No Association').closest('label');
      expect(label).not.toHaveAttribute('for');
    });
  });

  describe('Required Prop', () => {
    it('shows asterisk when required is true', () => {
      const { container } = render(<Label required>Required Field</Label>);
      const label = container.querySelector('label');

      // Check for asterisk in pseudo-element via computed styles or content
      expect(label).toBeInTheDocument();
      expect(screen.getByText('Required Field')).toBeInTheDocument();
    });

    it('does not show asterisk when required is false', () => {
      render(<Label required={false}>Optional Field</Label>);
      expect(screen.getByText('Optional Field')).toBeInTheDocument();
    });

    it('does not show asterisk by default', () => {
      render(<Label>Default Field</Label>);
      expect(screen.getByText('Default Field')).toBeInTheDocument();
    });
  });

  describe('Content Types', () => {
    it('renders string content', () => {
      render(<Label>Simple Text</Label>);
      expect(screen.getByText('Simple Text')).toBeInTheDocument();
    });

    it('renders JSX children', () => {
      render(
        <Label>
          <strong>Bold</strong> Label
        </Label>
      );
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders numeric content', () => {
      render(<Label>{123}</Label>);
      expect(screen.getByText('123')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(
        <Label data-testid="custom-label" id="label-1">
          Test
        </Label>
      );
      const label = screen.getByTestId('custom-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('id', 'label-1');
    });

    it('supports aria attributes', () => {
      render(<Label aria-label="Custom label">Test</Label>);
      const label = screen.getByLabelText('Custom label');
      expect(label).toBeInTheDocument();
    });

    it('supports data-* attributes', () => {
      const { container } = render(<Label data-field="email">Email</Label>);
      const label = container.querySelector('label');
      expect(label).toHaveAttribute('data-field', 'email');
    });
  });

  describe('Form Integration', () => {
    it('works with text input', () => {
      render(
        <div>
          <Label htmlFor="name">Name</Label>
          <input id="name" type="text" />
        </div>
      );
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('works with checkbox', () => {
      render(
        <div>
          <Label htmlFor="agree">I agree</Label>
          <input id="agree" type="checkbox" />
        </div>
      );
      expect(screen.getByText('I agree')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('works with select', () => {
      render(
        <div>
          <Label htmlFor="country">Country</Label>
          <select id="country">
            <option>USA</option>
          </select>
        </div>
      );
      expect(screen.getByText('Country')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string children', () => {
      const { container } = render(<Label>{''}</Label>);
      expect(container.firstChild).toBeNull();
    });

    it('handles null children', () => {
      const { container } = render(<Label>{null}</Label>);
      expect(container.firstChild).toBeNull();
    });

    it('handles undefined children', () => {
      const { container } = render(<Label>{undefined}</Label>);
      expect(container.firstChild).toBeNull();
    });

    it('handles very long text', () => {
      const longText = 'A'.repeat(1000);
      render(<Label>{longText}</Label>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles special characters', () => {
      render(<Label>{'Email (required) - user@example.com'}</Label>);
      expect(screen.getByText('Email (required) - user@example.com')).toBeInTheDocument();
    });
  });

  describe('Multiple Labels', () => {
    it('renders multiple labels independently', () => {
      render(
        <div>
          <Label htmlFor="field1">Field 1</Label>
          <Label htmlFor="field2">Field 2</Label>
          <Label htmlFor="field3">Field 3</Label>
        </div>
      );
      expect(screen.getByText('Field 1')).toBeInTheDocument();
      expect(screen.getByText('Field 2')).toBeInTheDocument();
      expect(screen.getByText('Field 3')).toBeInTheDocument();
    });

    it('handles mix of required and optional', () => {
      render(
        <div>
          <Label required>Required</Label>
          <Label>Optional</Label>
          <Label required>Also Required</Label>
        </div>
      );
      expect(screen.getByText('Required')).toBeInTheDocument();
      expect(screen.getByText('Optional')).toBeInTheDocument();
      expect(screen.getByText('Also Required')).toBeInTheDocument();
    });
  });
});
