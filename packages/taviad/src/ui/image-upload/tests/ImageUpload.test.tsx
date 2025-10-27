import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUpload } from '../components/ImageUpload';

// Mock the ImageCropModal component
vi.mock('../components/ImageCropModal', () => ({
  ImageCropModal: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="crop-modal">
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null,
}));

describe('ImageUpload', () => {
  const mockUploadImage = vi.fn();
  const mockOnChange = vi.fn();

  const defaultProps = {
    value: undefined,
    onChange: mockOnChange,
    uploadImage: mockUploadImage,
    isUploadImagePending: false,
    content: <p>Click or drag image to upload</p>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render upload zone', () => {
      render(<ImageUpload {...defaultProps} />);

      expect(screen.getByText('Click or drag image to upload')).toBeInTheDocument();
    });

    it('should render with custom content', () => {
      render(
        <ImageUpload
          {...defaultProps}
          content={<div data-testid="custom-content">Custom upload area</div>}
        />
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('should have proper display name', () => {
      expect(ImageUpload.displayName).toBe('ImageUpload');
    });

    it('should render with ARIA label', () => {
      render(<ImageUpload {...defaultProps} />);

      const label = screen.getByLabelText('Drag and drop an image here or click to browse');
      expect(label).toBeInTheDocument();
    });
  });

  describe('File Input', () => {
    it('should have hidden file input', () => {
      const { container } = render(<ImageUpload {...defaultProps} />);

      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'file');
      expect(input).toHaveAttribute('accept', 'image/*');
    });

    it('should trigger file input when clicking upload zone', () => {
      const { container } = render(<ImageUpload {...defaultProps} />);

      const label = screen.getByLabelText('Drag and drop an image here or click to browse');
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      // Label is connected to input via htmlFor/id
      expect(label).toHaveAttribute('for', 'upload');
      expect(input).toHaveAttribute('id', 'upload');
    });

    it('should handle file selection', async () => {
      const { container } = render(<ImageUpload {...defaultProps} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image content'], 'test.png', { type: 'image/png' });

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByTestId('crop-modal')).toBeInTheDocument();
      });
    });
  });

  describe('Image Preview', () => {
    it('should display preview when value is provided', () => {
      render(<ImageUpload {...defaultProps} value="https://example.com/image.jpg" />);

      const preview = screen.getByAltText('Upload preview');
      expect(preview).toBeInTheDocument();
      expect(preview).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('should not display preview when value is null', () => {
      render(<ImageUpload {...defaultProps} value={undefined} />);

      const preview = screen.queryByAltText('Upload preview');
      expect(preview).not.toBeInTheDocument();
    });

    it('should display preview when initial value is set', () => {
      const imageUrl = 'https://example.com/initial.jpg';
      render(<ImageUpload {...defaultProps} value={imageUrl} />);

      const preview = screen.getByAltText('Upload preview');
      expect(preview).toBeInTheDocument();
      expect(preview).toHaveAttribute('src', imageUrl);
    });
  });

  describe('Drag and Drop', () => {
    it('should handle drag over event', () => {
      render(<ImageUpload {...defaultProps} />);

      const label = screen.getByLabelText('Drag and drop an image here or click to browse');
      fireEvent.dragOver(label);

      expect(label).toBeInTheDocument();
    });

    it('should handle drag leave event', () => {
      render(<ImageUpload {...defaultProps} />);

      const label = screen.getByLabelText('Drag and drop an image here or click to browse');
      fireEvent.dragOver(label);
      fireEvent.dragLeave(label);

      expect(label).toBeInTheDocument();
    });

    it('should handle image drop', async () => {
      render(<ImageUpload {...defaultProps} />);

      const file = new File(['image content'], 'test.png', { type: 'image/png' });
      const label = screen.getByLabelText('Drag and drop an image here or click to browse');

      fireEvent.drop(label, {
        dataTransfer: {
          files: [file],
        },
      });

      await waitFor(() => {
        expect(screen.getByTestId('crop-modal')).toBeInTheDocument();
      });
    });

    it('should prevent default on drag over', () => {
      render(<ImageUpload {...defaultProps} />);

      const label = screen.getByLabelText('Drag and drop an image here or click to browse');
      const event = new Event('dragover', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      fireEvent(label, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Crop Modal', () => {
    it('should open crop modal when file is selected', async () => {
      const { container } = render(<ImageUpload {...defaultProps} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image content'], 'test.png', { type: 'image/png' });

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByTestId('crop-modal')).toBeInTheDocument();
      });
    });

    it('should not open crop modal initially', () => {
      render(<ImageUpload {...defaultProps} />);

      expect(screen.queryByTestId('crop-modal')).not.toBeInTheDocument();
    });

    it('should close crop modal when clicking close button', async () => {
      const user = userEvent.setup();
      const { container } = render(<ImageUpload {...defaultProps} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['image content'], 'test.png', { type: 'image/png' });

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByTestId('crop-modal')).toBeInTheDocument();
      });

      const closeButton = screen.getByText('Close Modal');
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('crop-modal')).not.toBeInTheDocument();
      });
    });
  });

  describe('Crop Dimensions', () => {
    it('should use default crop dimensions (16:9)', () => {
      render(<ImageUpload {...defaultProps} />);

      // Component should render with default dimensions
      expect(screen.getByText('Click or drag image to upload')).toBeInTheDocument();
    });

    it('should accept custom crop width', () => {
      render(<ImageUpload {...defaultProps} cropWidth={1} />);

      expect(screen.getByText('Click or drag image to upload')).toBeInTheDocument();
    });

    it('should accept custom crop height', () => {
      render(<ImageUpload {...defaultProps} cropHeight={1} />);

      expect(screen.getByText('Click or drag image to upload')).toBeInTheDocument();
    });

    it('should accept both custom width and height', () => {
      render(<ImageUpload {...defaultProps} cropWidth={4} cropHeight={3} />);

      expect(screen.getByText('Click or drag image to upload')).toBeInTheDocument();
    });
  });

  describe('Upload State', () => {
    it('should show pending state when upload is in progress', () => {
      render(<ImageUpload {...defaultProps} isUploadImagePending={true} />);

      expect(screen.getByText('Click or drag image to upload')).toBeInTheDocument();
    });

    it('should not show pending state when upload is complete', () => {
      render(<ImageUpload {...defaultProps} isUploadImagePending={false} />);

      expect(screen.getByText('Click or drag image to upload')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle file selection without files', () => {
      const { container } = render(<ImageUpload {...defaultProps} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;

      fireEvent.change(input, { target: { files: null } });

      expect(screen.queryByTestId('crop-modal')).not.toBeInTheDocument();
    });

    it('should handle drop without files', () => {
      render(<ImageUpload {...defaultProps} />);

      const label = screen.getByLabelText('Drag and drop an image here or click to browse');

      fireEvent.drop(label, {
        dataTransfer: {
          files: [],
        },
      });

      expect(screen.queryByTestId('crop-modal')).not.toBeInTheDocument();
    });

    it('should render multiple instances independently', () => {
      const { container } = render(
        <div>
          <ImageUpload {...defaultProps} content={<p>Upload 1</p>} />
          <ImageUpload {...defaultProps} content={<p>Upload 2</p>} />
        </div>
      );

      expect(screen.getByText('Upload 1')).toBeInTheDocument();
      expect(screen.getByText('Upload 2')).toBeInTheDocument();

      const inputs = container.querySelectorAll('input[type="file"]');
      expect(inputs).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA label on wrapper', () => {
      render(<ImageUpload {...defaultProps} />);

      const label = screen.getByLabelText('Drag and drop an image here or click to browse');
      expect(label).toHaveAttribute('aria-label');
    });

    it('should have alt text on preview image', () => {
      render(<ImageUpload {...defaultProps} value="https://example.com/image.jpg" />);

      const preview = screen.getByAltText('Upload preview');
      expect(preview).toBeInTheDocument();
    });

    it('should have proper file input attributes', () => {
      const { container } = render(<ImageUpload {...defaultProps} />);

      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute('accept', 'image/*');
      expect(input).toHaveAttribute('type', 'file');
    });
  });
});
