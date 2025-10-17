import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Form } from '../components/Form';

describe('Form', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<Form>Form content</Form>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render as a form element', () => {
      const { container } = render(<Form>Form content</Form>);
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form?.tagName).toBe('FORM');
    });

    it('should render children correctly', () => {
      render(
        <Form>
          <input type="text" placeholder="Name" />
          <button type="submit">Submit</button>
        </Form>
      );
      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <Form>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Form>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(<Form className="custom-form">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveClass('custom-form');
    });
  });

  describe('HTML Form Attributes', () => {
    it('should accept and apply action attribute', () => {
      const { container } = render(<Form action="/submit">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('action', '/submit');
    });

    it('should accept and apply method attribute', () => {
      const { container } = render(<Form method="post">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('method', 'post');
    });

    it('should accept and apply id attribute', () => {
      const { container } = render(<Form id="test-form">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('id', 'test-form');
    });

    it('should accept and apply name attribute', () => {
      render(<Form name="registration">Content</Form>);
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('name', 'registration');
    });

    it('should accept and apply encType attribute', () => {
      const { container } = render(<Form encType="multipart/form-data">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('enctype', 'multipart/form-data');
    });

    it('should accept and apply target attribute', () => {
      const { container } = render(<Form target="_blank">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('target', '_blank');
    });

    it('should accept and apply autoComplete attribute', () => {
      const { container } = render(<Form autoComplete="off">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('autocomplete', 'off');
    });

    it('should accept and apply noValidate attribute', () => {
      const { container } = render(<Form noValidate>Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('novalidate');
    });
  });

  describe('Event Handlers', () => {
    it('should call onSubmit when form is submitted', async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      render(
        <Form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </Form>
      );

      await user.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call onReset when form is reset', async () => {
      const handleReset = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      render(
        <Form onReset={handleReset}>
          <button type="reset">Reset</button>
        </Form>
      );

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(handleReset).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when form inputs change', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onChange={handleChange}>
          <input type="text" placeholder="Name" />
        </Form>
      );

      const input = screen.getByPlaceholderText('Name');
      await user.type(input, 'Test');
      expect(handleChange).toHaveBeenCalled();
    });

    it('should prevent default submission when onSubmit prevents it', async () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
      });
      const user = userEvent.setup();

      render(
        <Form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </Form>
      );

      await user.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit.mock.calls[0]?.[0].defaultPrevented).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have form role when accessible name is provided', () => {
      render(<Form aria-label="Test form">Content</Form>);
      expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('should accept aria-label attribute', () => {
      render(<Form aria-label="Registration Form">Content</Form>);
      const form = screen.getByRole('form', { name: 'Registration Form' });
      expect(form).toBeInTheDocument();
    });

    it('should accept aria-labelledby attribute', () => {
      render(
        <div>
          <h2 id="form-title">Sign Up Form</h2>
          <Form aria-labelledby="form-title">Content</Form>
        </div>
      );
      const form = screen.getByRole('form', { name: 'Sign Up Form' });
      expect(form).toBeInTheDocument();
    });

    it('should accept aria-describedby attribute', () => {
      const { container } = render(
        <div>
          <Form aria-describedby="form-description">Content</Form>
          <p id="form-description">Please fill out all required fields</p>
        </div>
      );
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('aria-describedby', 'form-description');
    });

    it('should accept aria-required attribute', () => {
      const { container } = render(<Form aria-required="true">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Data Attributes', () => {
    it('should accept data-testid attribute', () => {
      render(<Form data-testid="test-form">Content</Form>);
      expect(screen.getByTestId('test-form')).toBeInTheDocument();
    });

    it('should accept custom data attributes', () => {
      const { container } = render(<Form data-form-type="registration">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('data-form-type', 'registration');
    });

    it('should accept multiple data attributes', () => {
      const { container } = render(
        <Form data-form-id="123" data-form-version="2.0">
          Content
        </Form>
      );
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('data-form-id', '123');
      expect(form).toHaveAttribute('data-form-version', '2.0');
    });
  });

  describe('Styling', () => {
    it('should accept style prop', () => {
      const { container } = render(
        <Form style={{ backgroundColor: 'red', padding: '20px' }}>Content</Form>
      );
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('style');
    });

    it('should maintain Emotion styles', () => {
      const { container } = render(<Form>Content</Form>);
      const form = container.querySelector('form');
      const styles = window.getComputedStyle(form!);
      expect(styles.display).toBe('flex');
      expect(styles.flexDirection).toBe('column');
    });

    it('should apply custom className alongside default styles', () => {
      const { container } = render(<Form className="my-form">Content</Form>);
      const form = container.querySelector('form');
      expect(form).toHaveClass('my-form');
      const styles = window.getComputedStyle(form!);
      expect(styles.display).toBe('flex');
    });
  });

  describe('Form Field Integration', () => {
    it('should render with input fields', () => {
      render(
        <Form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </Form>
      );
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('should render with multiple input types', () => {
      render(
        <Form>
          <input type="text" placeholder="Text input" />
          <input type="email" placeholder="Email input" />
          <input type="password" placeholder="Password input" />
          <textarea placeholder="Textarea" />
        </Form>
      );
      expect(screen.getByPlaceholderText('Text input')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email input')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password input')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Textarea')).toBeInTheDocument();
    });

    it('should render with checkboxes and radio buttons', () => {
      render(
        <Form>
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">Accept terms</label>
          <input type="radio" id="option1" name="choice" />
          <label htmlFor="option1">Option 1</label>
        </Form>
      );
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should render with select elements', () => {
      render(
        <Form>
          <select>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </Form>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render empty form', () => {
      const { container } = render(<Form />);
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should handle null children', () => {
      const { container } = render(<Form>{null}</Form>);
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      const { container } = render(<Form>{undefined}</Form>);
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should handle boolean children', () => {
      const { container } = render(
        <Form>
          {false}
          {true}
        </Form>
      );
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should handle nested forms structure', () => {
      render(
        <Form>
          <div>
            <div>
              <input type="text" placeholder="Nested input" />
            </div>
          </div>
        </Form>
      );
      expect(screen.getByPlaceholderText('Nested input')).toBeInTheDocument();
    });

    it('should handle form with only buttons', () => {
      render(
        <Form>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
          <button type="button">Cancel</button>
        </Form>
      );
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(Form.displayName).toBe('Form');
    });
  });

  describe('Complex Form Scenarios', () => {
    it('should handle form with fieldsets', () => {
      render(
        <Form>
          <fieldset>
            <legend>Personal Information</legend>
            <input type="text" placeholder="Name" />
          </fieldset>
        </Form>
      );
      expect(screen.getByRole('group', { name: 'Personal Information' })).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    });

    it('should handle form with disabled fieldset', () => {
      render(
        <Form>
          <fieldset disabled>
            <input type="text" placeholder="Disabled input" />
          </fieldset>
        </Form>
      );
      expect(screen.getByPlaceholderText('Disabled input')).toBeDisabled();
    });

    it('should work with form validation', async () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
      });
      const user = userEvent.setup();

      render(
        <Form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <button type="submit">Submit</button>
        </Form>
      );

      await user.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
