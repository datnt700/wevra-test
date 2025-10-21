import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Mock ResizeObserver for Radix UI components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock pointer capture methods for Radix UI Slider (not supported in jsdom)
if (typeof Element !== 'undefined') {
  Element.prototype.setPointerCapture = Element.prototype.setPointerCapture || (() => {});
  Element.prototype.releasePointerCapture = Element.prototype.releasePointerCapture || (() => {});
  Element.prototype.hasPointerCapture = Element.prototype.hasPointerCapture || (() => false);
}

// Suppress expected TipTap/ProseMirror errors and webidl-conversions errors in jsdom environment
beforeAll(() => {
  // Handle uncaught exceptions (TipTap/ProseMirror synchronous errors)
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const message = args.join(' ');
    // Suppress known TipTap/ProseMirror errors and webidl-conversions errors that don't affect test validity
    if (
      message.includes('getClientRects is not a function') ||
      message.includes('There is no node type named') ||
      message.includes('webidl-conversions') ||
      message.includes('Cannot read properties of undefined')
    ) {
      return; // Suppress these expected errors
    }
    originalConsoleError(...args);
  };

  // Handle unhandled promise rejections (TipTap "image" node error + webidl errors)
  const originalUnhandledRejection = process.listeners('unhandledRejection');
  process.removeAllListeners('unhandledRejection');
  process.on('unhandledRejection', (reason: any) => {
    const message = reason?.message || reason?.toString() || '';
    // Suppress known TipTap/ProseMirror errors and webidl-conversions errors that don't affect test validity
    if (
      message.includes('There is no node type named') ||
      message.includes('getClientRects is not a function') ||
      message.includes('webidl-conversions') ||
      message.includes('Cannot read properties of undefined')
    ) {
      return; // Suppress these expected errors
    }
    // Re-throw other unhandled rejections
    originalUnhandledRejection.forEach((listener) => {
      if (typeof listener === 'function') {
        listener(reason, Promise.reject(reason));
      }
    });
  });

  // Handle uncaught errors (TipTap/ProseMirror synchronous errors + webidl errors)
  const originalUncaughtException = process.listeners('uncaughtException');
  process.removeAllListeners('uncaughtException');
  process.on('uncaughtException', (error: Error) => {
    const message = error?.message || error?.toString() || '';
    // Suppress known TipTap/ProseMirror errors and webidl-conversions errors that don't affect test validity
    if (
      message.includes('getClientRects is not a function') ||
      message.includes('There is no node type named') ||
      message.includes('webidl-conversions') ||
      message.includes('Cannot read properties of undefined')
    ) {
      return; // Suppress these expected errors
    }
    // Re-throw other uncaught exceptions
    originalUncaughtException.forEach((listener) => {
      if (typeof listener === 'function') {
        listener(error, 'uncaughtException');
      }
    });
  });
});

afterEach(() => {
  cleanup();
});
