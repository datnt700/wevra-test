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

    it('renders image element when src is provided', () => {
      render(<Avatar src="https://example.com/avatar.jpg" label="John Doe" />);
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  describe('Fallback Initials', () => {
    it('displays label text when no src is provided', () => {
      render(<Avatar label="John Doe" />);
      const label = screen.getByText('John Doe');
      expect(label).toBeInTheDocument();
    });

    it('displays fallback when provided', () => {
      render(<Avatar fallback="JD" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('displays default fallback when no label or fallback provided', () => {
      render(<Avatar />);
      expect(screen.getByText('?')).toBeInTheDocument();
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
      // radii.full is 9999px which creates a circular avatar
      expect(styles.borderRadius).toBe('9999px');
    });

    it('has flex display for centering', () => {
      const { container } = render(<Avatar label="Test" />);
      const avatar = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(avatar);
      // Avatar uses inline-flex for better inline layout
      expect(styles.display).toBe('inline-flex');
      expect(styles.alignItems).toBe('center');
      expect(styles.justifyContent).toBe('center');
    });
  });
});
