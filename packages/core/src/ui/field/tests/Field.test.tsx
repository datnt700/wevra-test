import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Field } from '../components/Field';

describe('Field', () => {
  describe('Basic Rendering', () => {
    it('should render with label and input', () => {
      render(
        <Field
          label="Email"
          input={<input type="email" placeholder="Enter email" data-testid="email-input" />}
        />
      );

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
    });

    it('should render with default column layout', () => {
      const { container } = render(
        <Field label="Name" input={<input type="text" />} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ flexDirection: 'column' });
    });

    it('should render with textarea input', () => {
      render(
        <Field
          label="Description"
          input={<textarea rows={4} data-testid="description" />}
        />
      );

      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByTestId('description')).toBeInTheDocument();
    });
  });

  describe('Layout Types', () => {
    it('should render with column layout when type is "column"', () => {
      const { container } = render(
        <Field type="column" label="Email" input={<input type="email" />} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ flexDirection: 'column' });
    });

    it('should render with row layout when type is "row"', () => {
      const { container } = render(
        <Field type="row" label="Subscribe" input={<input type="checkbox" />} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ flexDirection: 'row' });
    });

    it('should align items correctly for row layout', () => {
      const { container } = render(
        <Field type="row" label="Accept Terms" input={<input type="checkbox" />} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ alignItems: 'center' });
    });
  });

  describe('Input Types', () => {
    it('should render with text input', () => {
      render(
        <Field
          label="Username"
          input={<input type="text" data-testid="username" />}
        />
      );

      expect(screen.getByTestId('username')).toHaveAttribute('type', 'text');
    });

    it('should render with checkbox input', () => {
      render(
        <Field
          label="Remember Me"
          input={<input type="checkbox" data-testid="remember" />}
        />
      );

      expect(screen.getByTestId('remember')).toHaveAttribute('type', 'checkbox');
    });

    it('should render with select element', () => {
      render(
        <Field
          label="Country"
          input={
            <select data-testid="country">
              <option>USA</option>
              <option>Canada</option>
            </select>
          }
        />
      );

      expect(screen.getByTestId('country')).toBeInTheDocument();
      expect(screen.getByText('USA')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should pass custom className to wrapper', () => {
      const { container } = render(
        <Field
          className="custom-field"
          label="Name"
          input={<input type="text" />}
        />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-field');
    });

    it('should pass other props to wrapper', () => {
      const { container } = render(
        <Field
          label="Email"
          input={<input type="email" />}
          data-testid="field-wrapper"
        />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'field-wrapper');
    });

    it('should render with custom styled input component', () => {
      const StyledInput = () => (
        <input
          style={{ border: '2px solid red' }}
          data-testid="styled-input"
        />
      );

      render(
        <Field label="Custom" input={<StyledInput />} />
      );

      expect(screen.getByTestId('styled-input')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render with empty label', () => {
      render(
        <Field label="" input={<input type="text" data-testid="input" />} />
      );

      expect(screen.getByTestId('input')).toBeInTheDocument();
    });

    it('should render with complex input component', () => {
      const ComplexInput = () => (
        <div>
          <input type="text" data-testid="input1" />
          <input type="text" data-testid="input2" />
        </div>
      );

      render(
        <Field label="Multiple Inputs" input={<ComplexInput />} />
      );

      expect(screen.getByTestId('input1')).toBeInTheDocument();
      expect(screen.getByTestId('input2')).toBeInTheDocument();
    });
  });
});
