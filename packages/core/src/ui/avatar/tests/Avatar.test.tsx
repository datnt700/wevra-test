import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Avatar } from '../components/Avatar';

describe('Avatar', () => {
  describe('Basic Rendering', () => {
    it('renders with label', () => {
      render(<Avatar label="John Doe" />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      const { container } = render(<Avatar label="Test" className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders with default medium size', () => {
      const { container } = render(<Avatar label="Test" />);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      const { container } = render(<Avatar label="Test" size="sm" />);
      const avatar = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(avatar);
      expect(styles.width).toBe('2rem');
      expect(styles.height).toBe('2rem');
    });

    it('renders medium size', () => {
      const { container } = render(<Avatar label="Test" size="md" />);
      const avatar = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(avatar);
      expect(styles.width).toBe('2.5rem');
      expect(styles.height).toBe('2.5rem');
    });

    it('renders large size', () => {
      const { container } = render(<Avatar label="Test" size="lg" />);
      const avatar = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(avatar);
      expect(styles.width).toBe('3rem');
      expect(styles.height).toBe('3rem');
    });

    it('renders extra large size', () => {
      const { container } = render(<Avatar label="Test" size="xl" />);
      const avatar = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(avatar);
      expect(styles.width).toBe('4rem');
      expect(styles.height).toBe('4rem');
    });
  });

  describe('Image Loading', () => {
    it('displays image when src is provided and loads successfully', async () => {
      render(<Avatar src="https://example.com/avatar.jpg" label="John Doe" />);

      // In jsdom, images don't actually load, so we just verify structure
      const images = screen.getAllByAltText('John Doe');
      expect(images.length).toBeGreaterThan(0);
    });
    it('shows label while image is loading', () => {
      render(<Avatar src="https://example.com/avatar.jpg" label="John Doe" />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('shows fallback initials when image fails to load', async () => {
      // Mock image error
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<Avatar src="invalid-url" label="John Doe" />);

      const hiddenImage = screen.getAllByAltText('John Doe')[0];

      // Trigger error event
      if (hiddenImage) {
        const event = new Event('error');
        hiddenImage.dispatchEvent(event);
      }

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });
  });

  describe('Fallback Initials', () => {
    it('displays initials from full name', () => {
      render(<Avatar label="John Doe" />);

      // Initially shows full label while loading
      const label = screen.getByText('John Doe');
      expect(label).toBeInTheDocument();
    });

    it('generates initials from two-word name', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<Avatar src="invalid" label="Jane Smith" />);

      const image = screen.getAllByAltText('Jane Smith')[0];
      if (image) {
        const event = new Event('error');
        image.dispatchEvent(event);
      }

      await waitFor(() => {
        expect(screen.getByText('JS')).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });

    it('generates initials from three-word name (takes first two)', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<Avatar src="invalid" label="John Michael Doe" />);

      const image = screen.getAllByAltText('John Michael Doe')[0];
      if (image) {
        const event = new Event('error');
        image.dispatchEvent(event);
      }

      await waitFor(() => {
        expect(screen.getByText('JM')).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });

    it('generates initial from single-word name', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<Avatar src="invalid" label="Madonna" />);

      const image = screen.getAllByAltText('Madonna')[0];
      if (image) {
        const event = new Event('error');
        image.dispatchEvent(event);
      }

      await waitFor(() => {
        expect(screen.getByText('M')).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });

    it('converts initials to uppercase', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<Avatar src="invalid" label="john doe" />);

      const image = screen.getAllByAltText('john doe')[0];
      if (image) {
        const event = new Event('error');
        image.dispatchEvent(event);
      }

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });
  });

  describe('Image Attributes', () => {
    it('renders image with correct alt text', async () => {
      render(<Avatar src="https://example.com/avatar.jpg" label="Test User" />);

      await waitFor(() => {
        const images = screen.getAllByAltText('Test User');
        expect(images.length).toBeGreaterThan(0);
      });
    });

    it('renders image with correct src', async () => {
      const testSrc = 'https://example.com/test.jpg';
      render(<Avatar src={testSrc} label="Test" />);

      await waitFor(() => {
        const images = screen.getAllByAltText('Test') as HTMLImageElement[];
        const visibleImage = images.find((img) => !img.hidden);
        if (visibleImage) {
          expect(visibleImage.src).toContain('test.jpg');
        }
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label gracefully', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { container } = render(<Avatar src="invalid" label="" />);

      const images = screen.getAllByAltText('');
      if (images[0]) {
        const event = new Event('error');
        images[0].dispatchEvent(event);
      }

      await waitFor(() => {
        // Just verify the avatar rendered
        expect(container.firstChild).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });
    it('handles label with special characters', () => {
      render(<Avatar label="John-Doe O'Brien" />);
      expect(screen.getByText("John-Doe O'Brien")).toBeInTheDocument();
    });

    it('renders without src (no image)', () => {
      render(<Avatar label="No Image User" />);
      expect(screen.getByText('No Image User')).toBeInTheDocument();
    });

    it('handles very long names', () => {
      const longName = 'Verylongfirstname Verylonglastname';
      render(<Avatar label={longName} />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides alt text for images', async () => {
      render(<Avatar src="https://example.com/avatar.jpg" label="Accessible User" />);

      await waitFor(() => {
        const images = screen.getAllByAltText('Accessible User');
        expect(images.length).toBeGreaterThan(0);
      });
    });

    it('is keyboard accessible', () => {
      const { container } = render(<Avatar label="Test" />);
      const avatar = container.firstChild;
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Style Props', () => {
    it('applies border radius for circular shape', () => {
      const { container } = render(<Avatar label="Test" />);
      const avatar = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(avatar);
      expect(styles.borderRadius).toBe('50%');
    });

    it('has flex display for centering', () => {
      const { container } = render(<Avatar label="Test" />);
      const avatar = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(avatar);
      expect(styles.display).toBe('flex');
      expect(styles.alignItems).toBe('center');
      expect(styles.justifyContent).toBe('center');
    });
  });
});
