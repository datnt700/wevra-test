import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Image } from '../components/Image';

describe('Image', () => {
  describe('Basic Rendering', () => {
    it('should render with src and alt', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toBeInTheDocument();
      });
    });

    it('should render with placeholder initially', () => {
      render(
        <Image
          src="https://example.com/image.jpg"
          alt="Test image"
          placeholder={<div data-testid="placeholder">Loading...</div>}
        />
      );
      expect(screen.getByTestId('placeholder')).toBeInTheDocument();
    });

    it('should render without custom placeholder', () => {
      const { container: _container } = render(
        <Image src="https://example.com/image.jpg" alt="Test image" />
      );
      expect(_container.firstChild).toBeInTheDocument();
    });

    it('should render with className', () => {
      const { container } = render(
        <Image src="https://example.com/image.jpg" alt="Test image" className="custom-image" />
      );
      expect(container.querySelector('.custom-image')).toBeInTheDocument();
    });

    it('should render img element with correct type', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img.tagName).toBe('IMG');
      });
    });
  });

  describe('Image Loading', () => {
    it('should hide placeholder after image loads', async () => {
      render(
        <Image
          src="https://example.com/image.jpg"
          alt="Test image"
          placeholder={<div data-testid="placeholder">Loading...</div>}
        />
      );

      expect(screen.getByTestId('placeholder')).toBeInTheDocument();

      const img = screen.getByAltText('Test image') as HTMLImageElement;

      // Simulate image load
      img.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument();
      });
    });

    it('should call onLoad callback when image loads', async () => {
      const handleLoad = vi.fn();
      render(<Image src="https://example.com/image.jpg" alt="Test image" onLoad={handleLoad} />);

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(handleLoad).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle image load event', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" />);

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(img).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should show fallbackSrc when image fails to load', async () => {
      render(
        <Image
          src="https://example.com/broken.jpg"
          alt="Test image"
          fallbackSrc="https://example.com/fallback.jpg"
        />
      );

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        const fallbackImg = screen.getByAltText('Fallback for Test image');
        expect(fallbackImg).toBeInTheDocument();
      });
    });

    it('should call onError callback when image fails', async () => {
      const handleError = vi.fn();
      render(<Image src="https://example.com/broken.jpg" alt="Test image" onError={handleError} />);

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledTimes(1);
      });
    });

    it('should hide original image on error', async () => {
      render(
        <Image
          src="https://example.com/broken.jpg"
          alt="Test image"
          fallbackSrc="https://example.com/fallback.jpg"
        />
      );

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
      });
    });

    it('should not render fallback if no fallbackSrc provided', async () => {
      const { container } = render(<Image src="https://example.com/broken.jpg" alt="Test image" />);

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        const images = container.querySelectorAll('img');
        expect(images.length).toBe(0);
      });
    });
  });

  describe('Fallback Image', () => {
    it('should render fallback with correct src', async () => {
      render(
        <Image
          src="https://example.com/broken.jpg"
          alt="Test image"
          fallbackSrc="https://example.com/fallback.jpg"
        />
      );

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        const fallbackImg = screen.getByAltText('Fallback for Test image') as HTMLImageElement;
        expect(fallbackImg.src).toBe('https://example.com/fallback.jpg');
      });
    });

    it('should render fallback with correct alt text', async () => {
      render(
        <Image
          src="https://example.com/broken.jpg"
          alt="Profile picture"
          fallbackSrc="https://example.com/fallback.jpg"
        />
      );

      const img = screen.getByAltText('Profile picture') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        expect(screen.getByAltText('Fallback for Profile picture')).toBeInTheDocument();
      });
    });
  });

  describe('Placeholder', () => {
    it('should render custom placeholder', () => {
      render(
        <Image
          src="https://example.com/image.jpg"
          alt="Test image"
          placeholder={<div data-testid="custom-placeholder">Custom Loading</div>}
        />
      );
      expect(screen.getByTestId('custom-placeholder')).toBeInTheDocument();
    });

    it('should render placeholder with React element', () => {
      render(
        <Image
          src="https://example.com/image.jpg"
          alt="Test image"
          placeholder={<span>Loading...</span>}
        />
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should remove placeholder after error', async () => {
      render(
        <Image
          src="https://example.com/broken.jpg"
          alt="Test image"
          placeholder={<div data-testid="placeholder">Loading...</div>}
          fallbackSrc="https://example.com/fallback.jpg"
        />
      );

      expect(screen.getByTestId('placeholder')).toBeInTheDocument();

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument();
      });
    });
  });

  describe('HTML Attributes', () => {
    it('should support src attribute', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image') as HTMLImageElement;
        expect(img.src).toBe('https://example.com/image.jpg');
      });
    });

    it('should support alt attribute', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Descriptive text" />);
      await waitFor(() => {
        expect(screen.getByAltText('Descriptive text')).toBeInTheDocument();
      });
    });

    it('should support title attribute', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" title="Image title" />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('title', 'Image title');
      });
    });

    it('should support width attribute', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" width={300} />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('width', '300');
      });
    });

    it('should support height attribute', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" height={200} />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('height', '200');
      });
    });
  });

  describe('Data Attributes', () => {
    it('should support data-testid', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" data-testid="my-image" />);
      await waitFor(() => {
        expect(screen.getByTestId('my-image')).toBeInTheDocument();
      });
    });

    it('should support custom data attributes', async () => {
      render(
        <Image src="https://example.com/image.jpg" alt="Test image" data-custom="custom-value" />
      );
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('data-custom', 'custom-value');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have img role by default', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img.tagName).toBe('IMG');
      });
    });

    it('should support role attribute', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" role="presentation" />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('role', 'presentation');
      });
    });

    it('should support aria-label', async () => {
      render(
        <Image
          src="https://example.com/image.jpg"
          alt="Test image"
          aria-label="Detailed description"
        />
      );
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('aria-label', 'Detailed description');
      });
    });

    it('should have descriptive alt text', async () => {
      render(<Image src="https://example.com/image.jpg" alt="A beautiful sunset over the ocean" />);
      await waitFor(() => {
        expect(screen.getByAltText('A beautiful sunset over the ocean')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty src gracefully', () => {
      const { container } = render(<Image src="" alt="Empty src" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle empty alt gracefully', () => {
      const { container } = render(<Image src="https://example.com/image.jpg" alt="" />);
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', '');
    });

    it('should handle very long alt text', async () => {
      const longAlt = 'A'.repeat(200);
      render(<Image src="https://example.com/image.jpg" alt={longAlt} />);
      await waitFor(() => {
        expect(screen.getByAltText(longAlt)).toBeInTheDocument();
      });
    });

    it('should handle special characters in src', async () => {
      render(<Image src="https://example.com/image?id=123&size=large" alt="Test image" />);
      await waitFor(() => {
        const img = screen.getByAltText('Test image') as HTMLImageElement;
        expect(img.src).toContain('id=123');
      });
    });

    it('should handle special characters in alt', async () => {
      render(<Image src="https://example.com/image.jpg" alt="Test <image> & 'quotes'" />);
      await waitFor(() => {
        expect(screen.getByAltText("Test <image> & 'quotes'")).toBeInTheDocument();
      });
    });

    it('should handle undefined fallbackSrc', async () => {
      const { container } = render(
        <Image src="https://example.com/broken.jpg" alt="Test image" fallbackSrc={undefined} />
      );

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        const images = container.querySelectorAll('img');
        expect(images.length).toBe(0);
      });
    });
  });

  describe('Combined Props', () => {
    it('should render with all props combined', async () => {
      render(
        <Image
          src="https://example.com/image.jpg"
          alt="Test image"
          fallbackSrc="https://example.com/fallback.jpg"
          placeholder={<div data-testid="placeholder">Loading</div>}
          className="custom-image"
          width={300}
          height={200}
          title="Image title"
        />
      );

      expect(screen.getByTestId('placeholder')).toBeInTheDocument();

      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('width', '300');
        expect(img).toHaveAttribute('height', '200');
        expect(img).toHaveAttribute('title', 'Image title');
      });
    });

    it('should handle load and error callbacks together', async () => {
      const handleLoad = vi.fn();
      const handleError = vi.fn();
      render(
        <Image
          src="https://example.com/image.jpg"
          alt="Test image"
          onLoad={handleLoad}
          onError={handleError}
        />
      );

      const img = screen.getByAltText('Test image') as HTMLImageElement;
      img.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(handleLoad).toHaveBeenCalledTimes(1);
        expect(handleError).not.toHaveBeenCalled();
      });
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(Image.displayName).toBe('Image');
    });
  });
});
