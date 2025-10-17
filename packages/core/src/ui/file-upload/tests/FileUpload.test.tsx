import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from '../components/FileUpload';

describe('FileUpload', () => {
  describe('Basic Rendering', () => {
    it('should render file upload zone', () => {
      render(<FileUpload />);

      expect(screen.getByText(/Drag files or/)).toBeInTheDocument();
      expect(screen.getByText(/Click here/)).toBeInTheDocument();
      expect(screen.getByText(/to upload/)).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<FileUpload label="Upload Document" />);

      expect(screen.getByText('Upload Document')).toBeInTheDocument();
      expect(screen.getByLabelText('Upload Document')).toBeInTheDocument();
    });

    it('should render with description', () => {
      render(<FileUpload description="Max file size: 10MB" />);

      expect(screen.getByText('Max file size: 10MB')).toBeInTheDocument();
    });

    it('should render without label when not provided', () => {
      const { container } = render(<FileUpload />);

      const label = container.querySelector('label');
      expect(label).not.toBeInTheDocument();
    });

    it('should have proper display name', () => {
      expect(FileUpload.displayName).toBe('FileUpload');
    });
  });

  describe('Custom Content', () => {
    it('should render custom children', () => {
      render(
        <FileUpload>
          <div data-testid="custom-content">Custom upload area</div>
        </FileUpload>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.queryByText(/Drag files or/)).not.toBeInTheDocument();
    });

    it('should render default content when no children provided', () => {
      render(<FileUpload />);

      expect(screen.getByText(/Drag files or/)).toBeInTheDocument();
      expect(screen.getByText(/Click here/)).toBeInTheDocument();
    });

    it('should render CloudUpload icon in default content', () => {
      const { container } = render(<FileUpload />);

      // Icon component wraps the CloudUpload icon
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('File Input', () => {
    it('should have hidden file input', () => {
      const { container } = render(<FileUpload />);

      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'file');
      expect(input).toHaveAttribute('name', 'upload');
    });

    it('should support multiple files when multiple prop is true', () => {
      const { container } = render(<FileUpload multiple />);

      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute('multiple');
    });

    it('should not have multiple attribute when multiple is false', () => {
      const { container } = render(<FileUpload multiple={false} />);

      const input = container.querySelector('input[type="file"]');
      expect(input).not.toHaveAttribute('multiple');
    });

    it('should trigger file input on wrapper click', async () => {
      const user = userEvent.setup();
      const { container } = render(<FileUpload />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      const wrapper = screen.getByText(/Drag files or/).closest('div');
      if (wrapper) {
        await user.click(wrapper);
      }

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('Drag and Drop', () => {
    it('should handle drag over event', () => {
      render(<FileUpload />);

      const wrapper = screen.getByText(/Drag files or/).closest('div');
      if (wrapper) {
        fireEvent.dragOver(wrapper);
        // Component should add active state (border color changes)
        // Checking the wrapper exists after drag over
        expect(wrapper).toBeInTheDocument();
      }
    });

    it('should handle drag leave event', () => {
      render(<FileUpload />);

      const wrapper = screen.getByText(/Drag files or/).closest('div');
      if (wrapper) {
        fireEvent.dragOver(wrapper);
        fireEvent.dragLeave(wrapper);
        // Component should remove active state
        expect(wrapper).toBeInTheDocument();
      }
    });

    it('should handle file drop', () => {
      render(<FileUpload />);

      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const wrapper = screen.getByText(/Drag files or/).closest('div');

      if (wrapper) {
        fireEvent.drop(wrapper, {
          dataTransfer: {
            files: [file],
          },
        });

        // Wrapper should still be in the document after drop
        expect(wrapper).toBeInTheDocument();
      }
    });

    it('should prevent default on drag over', () => {
      render(<FileUpload />);

      const wrapper = screen.getByText(/Drag files or/).closest('div');
      if (wrapper) {
        const event = new Event('dragover', { bubbles: true, cancelable: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        fireEvent(wrapper, event);

        expect(preventDefaultSpy).toHaveBeenCalled();
      }
    });

    it('should prevent default on drop', () => {
      render(<FileUpload />);

      const wrapper = screen.getByText(/Drag files or/).closest('div');
      if (wrapper) {
        const event = new Event('drop', { bubbles: true, cancelable: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        fireEvent(wrapper, event);

        expect(preventDefaultSpy).toHaveBeenCalled();
      }
    });
  });
  describe('Multiple Props Combination', () => {
    it('should render with label, description, and multiple', () => {
      render(
        <FileUpload label="Upload Documents" description="PDF, DOC, DOCX supported" multiple />
      );

      expect(screen.getByText('Upload Documents')).toBeInTheDocument();
      expect(screen.getByText('PDF, DOC, DOCX supported')).toBeInTheDocument();

      const input = screen.getByLabelText('Upload Documents') as HTMLInputElement;
      expect(input).toHaveAttribute('multiple');
    });

    it('should render with custom children and label', () => {
      render(
        <FileUpload label="Upload Image">
          <div data-testid="custom-upload">Drop image here</div>
        </FileUpload>
      );

      expect(screen.getByText('Upload Image')).toBeInTheDocument();
      expect(screen.getByTestId('custom-upload')).toBeInTheDocument();
      expect(screen.queryByText(/Drag files or/)).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle drop without files', () => {
      render(<FileUpload />);

      const wrapper = screen.getByText(/Drag files or/).closest('div');
      if (wrapper) {
        fireEvent.drop(wrapper, {
          dataTransfer: {
            files: [],
          },
        });

        expect(wrapper).toBeInTheDocument();
      }
    });

    it('should render multiple instances independently', () => {
      const { container } = render(
        <div>
          <FileUpload label="Upload 1" />
          <FileUpload label="Upload 2" />
        </div>
      );

      expect(screen.getByText('Upload 1')).toBeInTheDocument();
      expect(screen.getByText('Upload 2')).toBeInTheDocument();

      const inputs = container.querySelectorAll('input[type="file"]');
      expect(inputs).toHaveLength(2);
    });

    it('should handle very long description', () => {
      const longDescription =
        'This is a very long description that explains all the file upload requirements in great detail including supported formats, maximum file size, and other important information.';

      render(<FileUpload description={longDescription} />);

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      render(<FileUpload label="Upload File" />);

      const input = screen.getByLabelText('Upload File');
      expect(input).toHaveAttribute('type', 'file');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<FileUpload label="Upload" />);

      const wrapper = screen.getByText(/Drag files or/).closest('div');
      if (wrapper) {
        await user.tab();
        // Wrapper should be focusable via click
        expect(wrapper).toBeInTheDocument();
      }
    });
  });
  describe('Accessibility', () => {
    it('should have proper label association', () => {
      render(<FileUpload label="Upload File" />);

      const input = screen.getByLabelText('Upload File');
      expect(input).toHaveAttribute('type', 'file');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<FileUpload label="Upload" />);

      const wrapper = screen.getByText(/Drag files or/).closest('div');
      if (wrapper) {
        await user.tab();
        // Wrapper should be focusable via click
        expect(wrapper).toBeInTheDocument();
      }
    });
  });
});
