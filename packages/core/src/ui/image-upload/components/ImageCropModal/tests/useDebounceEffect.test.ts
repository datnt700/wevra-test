import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounceEffect } from '../useDebounceEffect';

describe('useDebounceEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  describe('Basic Functionality', () => {
    it('should call function after wait time', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 100));

      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should not call function before wait time', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 200));

      vi.advanceTimersByTime(150);

      expect(mockFn).not.toHaveBeenCalled();
    });

    it('should call function with default empty dependencies', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 100));

      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Debouncing Behavior', () => {
    it('should call function after debounce period', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 100));

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle different debounce intervals', () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();

      renderHook(() => useDebounceEffect(mockFn1, 50));
      renderHook(() => useDebounceEffect(mockFn2, 200));

      vi.advanceTimersByTime(50);
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).not.toHaveBeenCalled();

      vi.advanceTimersByTime(150);
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });

    it('should work with various wait times', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 300));

      vi.advanceTimersByTime(250);
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Wait Time Variations', () => {
    it('should handle short wait time (50ms)', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 50));

      vi.advanceTimersByTime(50);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle long wait time (1000ms)', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 1000));

      vi.advanceTimersByTime(999);
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle zero wait time', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 0));

      vi.advanceTimersByTime(0);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Dependency Array', () => {
    it('should handle single dependency', () => {
      const mockFn = vi.fn();
      const count = 0;

      renderHook(() => useDebounceEffect(mockFn, 100, [count]));

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple dependencies', () => {
      const mockFn = vi.fn();
      const count = 0;
      const name = 'test';

      renderHook(() => useDebounceEffect(mockFn, 100, [count, name]));

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should not re-run when dependencies are unchanged', () => {
      const mockFn = vi.fn();
      const count = 0;

      const { rerender } = renderHook(() => useDebounceEffect(mockFn, 100, [count]));

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);

      rerender();
      vi.advanceTimersByTime(100);

      // Should still be 1 because dependency didn't change
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle object dependencies', () => {
      const mockFn = vi.fn();
      const obj = { value: 1 };

      renderHook(() => useDebounceEffect(mockFn, 100, [obj]));

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cleanup', () => {
    it('should clear timeout on unmount', () => {
      const mockFn = vi.fn();

      const { unmount } = renderHook(() => useDebounceEffect(mockFn, 100));

      unmount();

      vi.advanceTimersByTime(100);

      expect(mockFn).not.toHaveBeenCalled();
    });

    it('should clear timeout when cleanup is triggered', () => {
      const mockFn = vi.fn();

      const { unmount } = renderHook(() => useDebounceEffect(mockFn, 100));

      vi.advanceTimersByTime(50);
      unmount();

      vi.advanceTimersByTime(100);

      // Function should not be called because cleanup cleared the timeout
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid unmounts and remounts', () => {
      const mockFn = vi.fn();

      const { unmount } = renderHook(() => useDebounceEffect(mockFn, 100));

      vi.advanceTimersByTime(50);
      unmount();

      renderHook(() => useDebounceEffect(mockFn, 100));
      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Function Memoization', () => {
    it('should memoize function based on dependencies', () => {
      const mockFn = vi.fn();
      const count = 0;

      const { rerender } = renderHook(() => useDebounceEffect(mockFn, 100, [count]));

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Rerender without changing dependencies
      rerender();
      vi.advanceTimersByTime(100);

      // Should not call function again (memoized)
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should memoize function properly', () => {
      const mockFn = vi.fn();
      const count = 1;

      renderHook(() => useDebounceEffect(mockFn, 100, [count]));

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle async functions', async () => {
      const mockAsyncFn = vi.fn(async () => {
        return Promise.resolve('done');
      });

      renderHook(() => useDebounceEffect(mockAsyncFn, 100));

      vi.advanceTimersByTime(100);

      expect(mockAsyncFn).toHaveBeenCalledTimes(1);
    });

    it('should handle function that throws error', () => {
      const mockFn = vi.fn(() => {
        throw new Error('Test error');
      });

      renderHook(() => useDebounceEffect(mockFn, 100));

      expect(() => {
        vi.advanceTimersByTime(100);
      }).toThrow('Test error');
    });

    it('should handle very short wait time (1ms)', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 1));

      vi.advanceTimersByTime(1);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle empty dependency array', () => {
      const mockFn = vi.fn();

      renderHook(() => useDebounceEffect(mockFn, 100, []));

      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle function with side effects', () => {
      let sideEffect = 0;
      const mockFn = vi.fn(() => {
        sideEffect += 1;
      });

      renderHook(() => useDebounceEffect(mockFn, 100));

      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(sideEffect).toBe(1);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should work for search input scenario', () => {
      const mockSearch = vi.fn();
      const searchTerm = 'test query';

      renderHook(() => useDebounceEffect(mockSearch, 300, [searchTerm]));

      // Function should not be called immediately
      expect(mockSearch).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);

      // Should be called after debounce period
      expect(mockSearch).toHaveBeenCalledTimes(1);
    });

    it('should work for window resize scenario', () => {
      const mockResize = vi.fn();
      const width = 1920;

      renderHook(() => useDebounceEffect(mockResize, 250, [width]));

      vi.advanceTimersByTime(250);

      expect(mockResize).toHaveBeenCalledTimes(1);
    });

    it('should debounce form validation', () => {
      const mockValidate = vi.fn();
      let email = '';

      const { rerender } = renderHook(() => useDebounceEffect(mockValidate, 500, [email]));

      email = 'u';
      rerender();
      vi.advanceTimersByTime(200);

      email = 'user';
      rerender();
      vi.advanceTimersByTime(200);

      email = 'user@example.com';
      rerender();

      expect(mockValidate).not.toHaveBeenCalled();

      vi.advanceTimersByTime(500);

      expect(mockValidate).toHaveBeenCalledTimes(1);
    });
  });
});
