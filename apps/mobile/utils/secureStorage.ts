/**
 * Secure Storage Wrapper
 * Uses expo-secure-store on native platforms (iOS/Android)
 * Falls back to AsyncStorage on web
 */
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store a value securely
 * - Native: Uses encrypted SecureStore (iOS Keychain, Android Keystore)
 * - Web: Uses AsyncStorage (localStorage wrapper)
 */
export async function setItemAsync(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    // Web fallback - use AsyncStorage (localStorage)
    await AsyncStorage.setItem(key, value);
  } else {
    // Native - use SecureStore
    await SecureStore.setItemAsync(key, value);
  }
}

/**
 * Retrieve a value from secure storage
 */
export async function getItemAsync(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    // Web fallback
    return await AsyncStorage.getItem(key);
  } else {
    // Native
    return await SecureStore.getItemAsync(key);
  }
}

/**
 * Delete a value from secure storage
 */
export async function deleteItemAsync(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    // Web fallback
    await AsyncStorage.removeItem(key);
  } else {
    // Native
    await SecureStore.deleteItemAsync(key);
  }
}

/**
 * Clear all stored values
 */
export async function clearAll(): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.clear();
  } else {
    // SecureStore doesn't have a clear all method
    // You need to delete items individually
    const keys = ['userToken', 'userData'];
    await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)));
  }
}
