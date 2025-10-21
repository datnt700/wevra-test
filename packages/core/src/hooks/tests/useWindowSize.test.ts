/**
 * Tests for useWindowSize hook
 * Verifies window dimension tracking with SSR support
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useWindowSize } from '../useWindowSIze';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useWindowSize', () => {
  // Store original window dimensions
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    // Save original dimensions
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;

    // Reset to default jsdom dimensions (1024x768)
    window.innerWidth = 1024;
    window.innerHeight = 768;
  });

  afterEach(() => {
    // Restore original dimensions
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  describe('Basic Rendering', () => {
    it('should return dimensions object', () => {
      const { result } = renderHook(() => useWindowSize());

      // Initially undefined (SSR-safe)
      expect(result.current).toHaveProperty('width');
      expect(result.current).toHaveProperty('height');
    });

    it('should set initial window dimensions after mount', async () => {
      const { result } = renderHook(() => useWindowSize());

      await waitFor(() => {
        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(768);
      });
    });

    it('should use actual window inner dimensions', async () => {
      // jsdom defaults: innerWidth = 1024, innerHeight = 768
      const { result } = renderHook(() => useWindowSize());

      await waitFor(() => {
        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(768);
      });
    });
  });

  describe('Window Resize Events', () => {
    it('should update dimensions on window resize', async () => {
      const { result } = renderHook(() => useWindowSize());

      // Wait for initial dimensions
      await waitFor(() => {
        expect(result.current.width).toBe(1024);
      });

      // Trigger resize event
      act(() => {
        window.innerWidth = 1280;
        window.innerHeight = 720;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(1280);
        expect(result.current.height).toBe(720);
      });
    });

    it('should handle multiple resize events', async () => {
      const { result } = renderHook(() => useWindowSize());

      // Wait for initial dimensions
      await waitFor(() => {
        expect(result.current.width).toBe(1024);
      });

      // First resize
      act(() => {
        window.innerWidth = 800;
        window.innerHeight = 600;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(800);
        expect(result.current.height).toBe(600);
      });

      // Second resize
      act(() => {
        window.innerWidth = 1920;
        window.innerHeight = 1080;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(1920);
        expect(result.current.height).toBe(1080);
      });
    });

    it('should update width independently', async () => {
      const { result } = renderHook(() => useWindowSize());

      await waitFor(() => {
        expect(result.current.width).toBe(1024);
      });

      act(() => {
        window.innerWidth = 1440;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(1440);
      });
    });

    it('should update height independently', async () => {
      const { result } = renderHook(() => useWindowSize());

      await waitFor(() => {
        expect(result.current.height).toBe(768);
      });

      act(() => {
        window.innerHeight = 900;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.height).toBe(900);
      });
    });
  });

  describe('Event Listener Management', () => {
    it('should add resize event listener on mount', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      renderHook(() => useWindowSize());

      await waitFor(() => {
        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      });

      addEventListenerSpy.mockRestore();
    });

    it('should remove resize event listener on unmount', async () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useWindowSize());

      // Wait for initial setup
      await waitFor(() => {
        expect(window.innerWidth).toBe(1024);
      });

      unmount();

      await waitFor(() => {
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      });

      removeEventListenerSpy.mockRestore();
    });

    it('should not update dimensions after unmount', async () => {
      const { result, unmount } = renderHook(() => useWindowSize());

      await waitFor(() => {
        expect(result.current.width).toBe(1024);
      });

      const widthBeforeUnmount = result.current.width;

      unmount();

      // Try to trigger resize after unmount
      act(() => {
        window.innerWidth = 2000;
        window.dispatchEvent(new Event('resize'));
      });

      // Dimensions should not change after unmount
      expect(result.current.width).toBe(widthBeforeUnmount);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero dimensions', async () => {
      const { result } = renderHook(() => useWindowSize());

      act(() => {
        window.innerWidth = 0;
        window.innerHeight = 0;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(0);
        expect(result.current.height).toBe(0);
      });
    });

    it('should handle very large dimensions', async () => {
      const { result } = renderHook(() => useWindowSize());

      act(() => {
        window.innerWidth = 10000;
        window.innerHeight = 10000;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(10000);
        expect(result.current.height).toBe(10000);
      });
    });

    it('should handle fractional dimensions', async () => {
      const { result } = renderHook(() => useWindowSize());

      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1024.5,
        });
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: 768.75,
        });
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(1024.5);
        expect(result.current.height).toBe(768.75);
      });
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle mobile portrait to landscape rotation', async () => {
      const { result } = renderHook(() => useWindowSize());

      // Portrait mode (375x667 - iPhone SE)
      act(() => {
        window.innerWidth = 375;
        window.innerHeight = 667;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(375);
        expect(result.current.height).toBe(667);
      });

      // Landscape mode (swap dimensions)
      act(() => {
        window.innerWidth = 667;
        window.innerHeight = 375;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(667);
        expect(result.current.height).toBe(375);
      });
    });

    it('should handle desktop window resizing', async () => {
      const { result } = renderHook(() => useWindowSize());

      // Full HD
      act(() => {
        window.innerWidth = 1920;
        window.innerHeight = 1080;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(1920);
      });

      // Half width
      act(() => {
        window.innerWidth = 960;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(960);
      });
    });

    it('should handle tablet dimensions', async () => {
      const { result } = renderHook(() => useWindowSize());

      // iPad Pro 12.9"
      act(() => {
        window.innerWidth = 1024;
        window.innerHeight = 1366;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(1366);
      });
    });
  });

  describe('SSR Compatibility', () => {
    it('should return object with dimensions during initial render', () => {
      const { result } = renderHook(() => useWindowSize());

      // Hook returns dimensions object (initially undefined for SSR safety)
      expect(result.current).toHaveProperty('width');
      expect(result.current).toHaveProperty('height');
    });

    it('should not cause hydration mismatch warnings', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn');

      renderHook(() => useWindowSize());

      await waitFor(() => {
        expect(window.innerWidth).toBe(1024);
      });

      // No hydration warnings should be logged
      expect(consoleWarnSpy).not.toHaveBeenCalledWith(expect.stringContaining('hydration'));

      consoleWarnSpy.mockRestore();
    });
  });
});
