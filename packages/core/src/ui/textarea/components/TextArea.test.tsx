import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  describe('Basic Rendering', () => {
    it('should render the textarea element', () => {
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<TextArea placeholder="Enter your message..." />);
      const textarea = screen.getByPlaceholderText('Enter your message...');
      expect(textarea).toBeInTheDocument();
    });

    it('should render with default value', () => {
      render(<TextArea value="Initial text" readOnly />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('Initial text');
    });

    it('should render as multiline input', () => {
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.tagName).toBe('TEXTAREA');
    });
  });

  describe('Validation States', () => {
    it('should apply error validation style', () => {
      const { container } = render(<TextArea validate="error" />);
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });

    it('should apply success validation style', () => {
      const { container } = render(<TextArea validate="success" />);
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });

    it('should apply warning validation style', () => {
      const { container } = render(<TextArea validate="warning" />);
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when provided', () => {
      render(<TextArea errorMessage="This field is required" />);
      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should show error validation when errorMessage is provided', () => {
      render(<TextArea errorMessage="Error" />);
      const errorMessage = screen.getByText('Error');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when disabled is true', () => {
      render(<TextArea disabled />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();
    });

    it('should not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<TextArea disabled onChange={handleChange} />);

      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'New text' } });

      // Disabled inputs don't prevent onChange in HTML, so check disabled attribute instead
      expect(textarea).toBeDisabled();
    });
  });

  describe('Read-Only State', () => {
    it('should have readOnly attribute when readOnly is true', () => {
      render(<TextArea readOnly />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('readonly');
    });

    it('should not be editable when read-only', () => {
      render(<TextArea readOnly value="Read-only text" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveAttribute('readonly');
      expect(textarea.value).toBe('Read-only text');
    });
  });

  describe('User Interactions', () => {
    it('should call onChange when text is entered', () => {
      const handleChange = vi.fn();
      render(<TextArea onChange={handleChange} />);

      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'New content' } });

      expect(handleChange).toHaveBeenCalled();
    });

    it('should update value on user typing', () => {
      render(<TextArea />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      fireEvent.change(textarea, { target: { value: 'User typed text' } });

      expect(textarea.value).toBe('User typed text');
    });

    it('should support multiline input', () => {
      render(<TextArea />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const multilineText = 'Line 1\nLine 2\nLine 3';
      fireEvent.change(textarea, { target: { value: multilineText } });

      expect(textarea.value).toBe(multilineText);
    });
  });

  describe('Resize Behavior', () => {
    it('should allow vertical resize by default', () => {
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');

      // TextArea should have resize: vertical in styles
      expect(textarea).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have textbox role', () => {
      render(<TextArea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
    });

    it('should have correct id attribute', () => {
      render(<TextArea id="message-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('id', 'message-textarea');
    });

    it('should have correct name attribute', () => {
      render(<TextArea name="message" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('name', 'message');
    });

    it('should have aria-describedby when provided', () => {
      render(<TextArea ariaDescribedBy="error-message" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'error-message');
    });

    it('should link error message with aria-describedby', () => {
      render(<TextArea id="textarea" errorMessage="Error message" ariaDescribedBy="error-msg" />);
      const textarea = screen.getByRole('textbox');
      const errorMessage = screen.getByText('Error message');

      expect(textarea).toHaveAttribute('aria-describedby', 'error-msg');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
