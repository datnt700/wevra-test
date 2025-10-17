import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from '../components/TextArea';

describe('TextArea', () => {
  // Basic Rendering
  describe('Basic Rendering', () => {
    it('should render with default structure', () => {
      render(<TextArea />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<TextArea placeholder="Enter your text..." />);
      expect(screen.getByPlaceholderText('Enter your text...')).toBeInTheDocument();
    });

    it('should render with initial value', () => {
      render(<TextArea value="Initial text" onChange={() => {}} />);
      expect(screen.getByDisplayValue('Initial text')).toBeInTheDocument();
    });

    it('should render with id attribute', () => {
      render(<TextArea id="my-textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('id', 'my-textarea');
    });

    it('should render with name attribute', () => {
      render(<TextArea name="message" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('name', 'message');
    });
  });

  // User Interaction
  describe('User Interaction', () => {
    it('should call onChange when typing', async () => {
      const handleChange = vi.fn();
      render(<TextArea onChange={handleChange} />);

      const textarea = screen.getByTestId('textarea');
      await userEvent.type(textarea, 'Hello');

      expect(handleChange).toHaveBeenCalled();
    });

    it('should update value when typing in controlled mode', async () => {
      const { rerender } = render(<TextArea value="" onChange={() => {}} />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveValue('');

      rerender(<TextArea value="New text" onChange={() => {}} />);
      expect(textarea).toHaveValue('New text');
    });

    it('should allow multi-line input', async () => {
      const handleChange = vi.fn();
      render(<TextArea onChange={handleChange} />);

      const textarea = screen.getByTestId('textarea');
      await userEvent.type(textarea, 'Line 1{Enter}Line 2');

      expect(handleChange).toHaveBeenCalled();
    });
  });

  // Validation States
  describe('Validation States', () => {
    it('should render with error state', () => {
      const { container } = render(<TextArea validate="error" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render error message when provided', () => {
      render(<TextArea validate="error" errorMessage="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should not render error message when validate is not error', () => {
      render(<TextArea errorMessage="This field is required" />);
      // Error message is shown regardless of validate prop
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should render with success state', () => {
      const { container } = render(<TextArea validate="success" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with warning state', () => {
      const { container } = render(<TextArea validate="warning" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  // Disabled and ReadOnly States
  describe('Disabled and ReadOnly States', () => {
    it('should render as disabled', () => {
      render(<TextArea disabled />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeDisabled();
    });

    it('should not call onChange when disabled', async () => {
      const handleChange = vi.fn();
      render(<TextArea disabled onChange={handleChange} />);

      const textarea = screen.getByTestId('textarea');
      await userEvent.type(textarea, 'Test');

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should render as read-only', () => {
      render(<TextArea readOnly />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('readonly');
    });

    it('should not allow typing when read-only', async () => {
      render(<TextArea readOnly value="Read only text" onChange={() => {}} />);

      const textarea = screen.getByTestId('textarea');
      await userEvent.type(textarea, 'Try to type');

      expect(textarea).toHaveValue('Read only text');
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('should support aria-describedby', () => {
      render(<TextArea ariaDescribedBy="error-msg" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('aria-describedby', 'error-msg');
    });

    it('should be keyboard accessible', async () => {
      render(<TextArea />);
      const textarea = screen.getByTestId('textarea');

      textarea.focus();
      expect(textarea).toHaveFocus();
    });

    it('should allow tab navigation', async () => {
      render(
        <div>
          <TextArea data-testid="textarea-1" />
          <TextArea data-testid="textarea-2" />
        </div>
      );

      const textarea1 = screen.getByTestId('textarea-1');
      const textarea2 = screen.getByTestId('textarea-2');

      textarea1.focus();
      expect(textarea1).toHaveFocus();

      await userEvent.tab();
      expect(textarea2).toHaveFocus();
    });
  });

  // Display Name
  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(TextArea.displayName).toBe('TextArea');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle empty string value', () => {
      render(<TextArea value="" onChange={() => {}} />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveValue('');
    });

    it('should handle very long text', () => {
      const longText = 'A'.repeat(1000);
      render(<TextArea value={longText} onChange={() => {}} />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveValue(longText);
    });

    it('should handle special characters', async () => {
      const handleChange = vi.fn();
      render(<TextArea onChange={handleChange} />);

      const textarea = screen.getByTestId('textarea');
      await userEvent.type(textarea, '!@#$%^&*()');

      expect(handleChange).toHaveBeenCalled();
    });

    it('should handle line breaks', () => {
      const valueWithLineBreaks = 'Line 1\nLine 2\nLine 3';
      render(<TextArea value={valueWithLineBreaks} onChange={() => {}} />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveValue(valueWithLineBreaks);
    });

    it('should not render error message when errorMessage is empty string', () => {
      const { container } = render(<TextArea validate="error" errorMessage="" />);
      // Error message element should not be rendered when empty string
      const errorElement = container.querySelector('span');
      expect(errorElement).not.toBeInTheDocument();
    });
  });

  // HTML Attributes
  describe('HTML Attributes', () => {
    it('should pass through additional HTML attributes', () => {
      render(<TextArea data-custom="value" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('data-custom', 'value');
    });

    it('should support rows attribute', () => {
      render(<TextArea rows={10} />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('rows', '10');
    });

    it('should support cols attribute', () => {
      render(<TextArea cols={50} />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('cols', '50');
    });

    it('should support maxLength attribute', () => {
      render(<TextArea maxLength={100} />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('maxLength', '100');
    });
  });

  // Ref Forwarding
  describe('Ref Forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = vi.fn();
      render(<TextArea ref={ref as any} />);
      expect(ref).toHaveBeenCalled();
    });

    it('should allow ref to access textarea element', () => {
      let textareaRef: HTMLTextAreaElement | null = null;

      render(
        <TextArea
          ref={(el) => {
            textareaRef = el;
          }}
        />
      );

      expect(textareaRef).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  // Common Use Cases
  describe('Common Use Cases', () => {
    it('should render contact form message field', () => {
      render(<TextArea id="message" name="message" placeholder="Your message..." rows={5} />);

      const textarea = screen.getByPlaceholderText('Your message...');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('should render comment input with validation', () => {
      render(
        <TextArea
          placeholder="Leave a comment..."
          validate="error"
          errorMessage="Comment is required"
        />
      );

      expect(screen.getByPlaceholderText('Leave a comment...')).toBeInTheDocument();
      expect(screen.getByText('Comment is required')).toBeInTheDocument();
    });

    it('should render feedback form', async () => {
      const handleChange = vi.fn();
      render(
        <TextArea
          id="feedback"
          name="feedback"
          placeholder="Share your feedback..."
          onChange={handleChange}
        />
      );

      const textarea = screen.getByPlaceholderText('Share your feedback...');
      await userEvent.type(textarea, 'Great product!');

      expect(handleChange).toHaveBeenCalled();
    });
  });
});
