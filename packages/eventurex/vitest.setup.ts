import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock React Native modules
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).__DEV__ = true;

// Mock AsyncStorage
const AsyncStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  getAllKeys: vi.fn(),
  multiGet: vi.fn(),
  multiSet: vi.fn(),
  multiRemove: vi.fn(),
};

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: AsyncStorageMock,
}));

// Mock Expo modules
vi.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      name: 'Eventure Mobile UI',
      slug: 'eventure-mobile-ui',
    },
  },
}));

vi.mock('expo-font', () => ({
  loadAsync: vi.fn(),
  isLoaded: vi.fn(() => true),
}));
