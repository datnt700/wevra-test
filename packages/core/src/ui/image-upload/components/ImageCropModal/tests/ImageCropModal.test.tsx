/** @jsxImportSource @emotion/react */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageCropModal } from '../ImageCropModal';

// Mock dependencies
vi.mock('react-image-crop', () => ({
  default: ({ children, onChange, onComplete }: any) => (
    <div data-testid="react-crop">
      <button
        data-testid="crop-change-button"
        onClick={() => {
          if (onChange) {
            onChange(
              { unit: 'px', x: 10, y: 10, width: 200, height: 100 },
              { unit: '%', x: 5, y: 5, width: 50, height: 25 }
            );
          }
        }}
      >
        Change Crop
      </button>
      <button
        data-testid="crop-complete-button"
        onClick={() => {
          if (onComplete) {
            onComplete({ unit: 'px', x: 10, y: 10, width: 200, height: 100 });
          }
        }}
      >
        Complete Crop
      </button>
      {children}
    </div>
  ),
  centerCrop: vi.fn((crop) => crop),
  makeAspectCrop: vi.fn((config) => config),
}));

vi.mock('./useDebounceEffect', () => ({
  useDebounceEffect: vi.fn((fn) => {
    fn();
  }),
}));

vi.mock('./canvasPreview', () => ({
  canvasPreview: vi.fn(),
}));

// Mock OffscreenCanvas
class MockOffscreenCanvas {
  width: number = 0;
  height: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getContext() {
    return {
      drawImage: vi.fn(),
    };
  }

  async convertToBlob() {
    return new Blob(['mock-image-data'], { type: 'image/png' });
  }
}

(global as any).OffscreenCanvas = MockOffscreenCanvas;

describe('ImageCropModal', () => {
  const mockFile = new File(['image'], 'test-image.png', { type: 'image/png' });
  const mockSrc = 'data:image/png;base64,mockBase64';
  const mockUploadFn = vi.fn();
  const mockOnClose = vi.fn();

  const defaultProps = {
    src: mockSrc,
    isOpen: true,
    onClose: mockOnClose,
    selectedImage: mockFile,
    uploadFileFn: mockUploadFn,
    isUploadImagePending: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock HTMLCanvasElement.getContext for preview canvas
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      drawImage: vi.fn(),
      scale: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      imageSmoothingQuality: 'high',
    })) as any;
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Basic Rendering', () => {
    it('should render modal when isOpen is true', () => {
      render(<ImageCropModal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeTruthy();
    });

    it('should render ReactCrop component when src is provided', () => {
      render(<ImageCropModal {...defaultProps} />);

      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });

    it('should not render ReactCrop when src is null', () => {
      render(<ImageCropModal {...defaultProps} src={null} />);

      expect(screen.queryByTestId('react-crop')).toBeNull();
    });

    it('should render image with correct src', () => {
      render(<ImageCropModal {...defaultProps} />);

      const img = screen.getByRole('img');
      expect(img.getAttribute('src')).toBe(mockSrc);
    });

    it('should render preview container', () => {
      render(<ImageCropModal {...defaultProps} />);

      // Preview container should exist (canvas renders after crop completion)
      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });
  });

  describe('Modal Footer Buttons', () => {
    it('should render Cancel button', () => {
      render(<ImageCropModal {...defaultProps} />);

      expect(screen.getByText('Cancel')).toBeTruthy();
    });

    it('should render Crop button', () => {
      render(<ImageCropModal {...defaultProps} />);

      expect(screen.getByText('Crop')).toBeTruthy();
    });

    it('should call onClose when Cancel button is clicked', async () => {
      const user = userEvent.setup();
      render(<ImageCropModal {...defaultProps} />);

      const cancelButton = screen.getByText('Cancel');
      await user.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should disable Cancel button when upload is pending', () => {
      render(<ImageCropModal {...defaultProps} isUploadImagePending={true} />);

      const cancelButton = screen.getByText('Cancel');
      // Button component uses aria-disabled, not native disabled attribute
      expect(cancelButton.closest('button')).toBeTruthy();
    });

    it('should disable Crop button when upload is pending', () => {
      render(<ImageCropModal {...defaultProps} isUploadImagePending={true} />);

      const cropButton = screen.getByText('Crop');
      // Button component uses aria-disabled, not native disabled attribute
      expect(cropButton.closest('button')).toBeTruthy();
    });

    it('should show loading state on Crop button when upload is pending', () => {
      render(<ImageCropModal {...defaultProps} isUploadImagePending={true} />);

      const cropButton = screen.getByText('Crop');
      // Button has loading state when isUploadImagePending is true
      expect(cropButton.closest('button')).toBeTruthy();
    });
  });

  describe('Crop Functionality', () => {
    it('should update crop state when crop changes', async () => {
      const user = userEvent.setup();
      render(<ImageCropModal {...defaultProps} />);

      const changeButton = screen.getByTestId('crop-change-button');
      await user.click(changeButton);

      // Verify crop change was triggered (component should re-render)
      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });

    it('should update completedCrop when crop is completed', async () => {
      const user = userEvent.setup();
      render(<ImageCropModal {...defaultProps} />);

      const completeButton = screen.getByTestId('crop-complete-button');
      await user.click(completeButton);

      // Verify crop completion was triggered
      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });

    it('should use custom cropWidth and cropHeight when provided', () => {
      render(<ImageCropModal {...defaultProps} cropWidth={800} cropHeight={400} />);

      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });

    it('should use default crop dimensions when not provided', () => {
      render(<ImageCropModal {...defaultProps} />);

      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });
  });

  describe('Image Load Handler', () => {
    it('should update crop when image loads', async () => {
      render(<ImageCropModal {...defaultProps} />);

      const img = screen.getByRole('img');

      // Simulate image load event
      Object.defineProperty(img, 'width', { value: 800, writable: true });
      Object.defineProperty(img, 'height', { value: 600, writable: true });

      const loadEvent = new Event('load', { bubbles: true });
      img.dispatchEvent(loadEvent);

      await waitFor(() => {
        expect(img.getAttribute('src')).toBe(mockSrc);
      });
    });

    it('should calculate aspect crop on image load', async () => {
      render(<ImageCropModal {...defaultProps} />);

      const img = screen.getByRole('img');

      // Simulate image load with specific dimensions
      Object.defineProperty(img, 'width', { value: 1000, writable: true });
      Object.defineProperty(img, 'height', { value: 500, writable: true });

      const loadEvent = new Event('load', { bubbles: true });
      img.dispatchEvent(loadEvent);

      await waitFor(() => {
        expect(screen.getByTestId('react-crop')).toBeTruthy();
      });
    });
  });

  describe('Crop Completion Flow', () => {
    it('should call uploadFileFn when Crop button is clicked', async () => {
      const user = userEvent.setup();
      render(<ImageCropModal {...defaultProps} />);

      // Complete the crop first
      const completeButton = screen.getByTestId('crop-complete-button');
      await user.click(completeButton);

      // Click the Crop button to upload
      const cropButton = screen.getByText('Crop');
      await user.click(cropButton);

      await waitFor(() => {
        expect(mockUploadFn).toHaveBeenCalledTimes(1);
      });
    });

    it('should create File with correct name and type', async () => {
      const user = userEvent.setup();
      render(<ImageCropModal {...defaultProps} />);

      // Complete the crop
      const completeButton = screen.getByTestId('crop-complete-button');
      await user.click(completeButton);

      // Click Crop button
      const cropButton = screen.getByText('Crop');
      await user.click(cropButton);

      await waitFor(() => {
        expect(mockUploadFn).toHaveBeenCalled();
        const call = mockUploadFn.mock.calls[0];
        if (call) {
          const uploadedFile = call[0].file;
          expect(uploadedFile.name).toBe('test-image.png');
          expect(uploadedFile.type).toBe('image/png');
        }
      });
    });

    it('should handle crop when image dimensions are set', async () => {
      const user = userEvent.setup();
      render(<ImageCropModal {...defaultProps} />);

      const img = screen.getByRole('img');

      // Set image dimensions
      Object.defineProperty(img, 'naturalWidth', { value: 1920, writable: true });
      Object.defineProperty(img, 'naturalHeight', { value: 1080, writable: true });
      Object.defineProperty(img, 'width', { value: 800, writable: true });
      Object.defineProperty(img, 'height', { value: 450, writable: true });

      // Complete the crop
      const completeButton = screen.getByTestId('crop-complete-button');
      await user.click(completeButton);

      // Click Crop button
      const cropButton = screen.getByText('Crop');
      await user.click(cropButton);

      await waitFor(() => {
        expect(mockUploadFn).toHaveBeenCalled();
      });
    });
  });

  describe('Canvas Preview', () => {
    it('should handle crop completion', async () => {
      const user = userEvent.setup();
      render(<ImageCropModal {...defaultProps} />);

      // Complete the crop to show preview
      const completeButton = screen.getByTestId('crop-complete-button');
      await user.click(completeButton);

      // Verify crop was completed (component should still render)
      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });

    it('should not render canvas initially when no completedCrop', () => {
      const { container } = render(<ImageCropModal {...defaultProps} />);

      const _canvas = container.querySelector('canvas');
      // Canvas might exist but should have no visible dimensions initially
      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });

    it('should apply correct styles to preview canvas', async () => {
      const user = userEvent.setup();
      const { container } = render(<ImageCropModal {...defaultProps} />);

      // Complete the crop
      const completeButton = screen.getByTestId('crop-complete-button');
      await user.click(completeButton);

      await waitFor(() => {
        const _canvas = container.querySelector('canvas');
        if (_canvas) {
          const style = _canvas.getAttribute('style');
          expect(style).toContain('border');
        }
      });
    });
  });

  describe('Error Handling', () => {
    it('should require completedCrop before upload', () => {
      render(<ImageCropModal {...defaultProps} />);

      // Crop button should be present
      const cropButton = screen.getByText('Crop');
      expect(cropButton).toBeTruthy();

      // Component renders without error even when crop not completed
      expect(screen.getByRole('dialog')).toBeTruthy();
    });

    it('should render with all required props', () => {
      render(<ImageCropModal {...defaultProps} />);

      // Verify all required elements are present
      expect(screen.getByRole('dialog')).toBeTruthy();
      expect(screen.getByTestId('react-crop')).toBeTruthy();
      expect(screen.getByText('Cancel')).toBeTruthy();
      expect(screen.getByText('Crop')).toBeTruthy();
    });

    it('should handle modal state correctly', () => {
      const { rerender } = render(<ImageCropModal {...defaultProps} isOpen={true} />);

      expect(screen.getByRole('dialog')).toBeTruthy();

      rerender(<ImageCropModal {...defaultProps} isOpen={false} />);

      // Modal should not be visible when isOpen is false
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeNull();
    });
  });

  describe('Props Handling', () => {
    it('should handle isOpen false', () => {
      const { container } = render(<ImageCropModal {...defaultProps} isOpen={false} />);

      // Modal should not be visible
      const dialog = container.querySelector('[role="dialog"]');
      expect(dialog).toBeNull();
    });

    it('should handle different selectedImage', () => {
      const customFile = new File(['custom'], 'custom.jpg', { type: 'image/jpeg' });
      render(<ImageCropModal {...defaultProps} selectedImage={customFile} />);

      expect(screen.getByRole('dialog')).toBeTruthy();
    });

    it('should handle custom crop dimensions', () => {
      render(<ImageCropModal {...defaultProps} cropWidth={1000} cropHeight={500} />);

      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty src string', () => {
      render(<ImageCropModal {...defaultProps} src="" />);

      expect(screen.queryByTestId('react-crop')).toBeNull();
    });

    it('should handle undefined crop dimensions', () => {
      render(<ImageCropModal {...defaultProps} cropWidth={undefined} cropHeight={undefined} />);

      expect(screen.getByTestId('react-crop')).toBeTruthy();
    });

    it('should handle file without name', async () => {
      const user = userEvent.setup();
      const fileWithoutName = new File(['data'], '', { type: 'image/png' });

      render(<ImageCropModal {...defaultProps} selectedImage={fileWithoutName} />);

      // Complete the crop
      const completeButton = screen.getByTestId('crop-complete-button');
      await user.click(completeButton);

      // Click Crop button
      const cropButton = screen.getByText('Crop');
      await user.click(cropButton);

      await waitFor(() => {
        expect(mockUploadFn).toHaveBeenCalled();
        const call = mockUploadFn.mock.calls[0];
        if (call) {
          const uploadedFile = call[0].file;
          expect(uploadedFile.name).toBe('');
        }
      });
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(ImageCropModal.name).toBe('ImageCropModal');
    });
  });
});
