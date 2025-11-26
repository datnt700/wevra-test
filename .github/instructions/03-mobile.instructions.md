---
applyTo: 'apps/mobile/**/*.{ts,tsx}'
---

# React Native Mobile Patterns

## Architecture

```
apps/mobile/
├── app/
│   ├── (auth)/              # Authentication flow
│   ├── (tabs)/              # Main app with tab navigation
│   ├── _layout.tsx          # Root layout with providers
│   └── +not-found.tsx       # 404 page
├── components/              # App-specific components
├── utils/
│   └── secureStorage.ts     # Platform-specific storage
├── hooks/                   # Custom React hooks
├── theme/                   # Extends @tavia/taviax tokens
├── .env                     # ⚠️ Use local IP for physical devices
└── app.json                 # Expo configuration
```

## Platform-Specific Storage

```typescript
// utils/secureStorage.ts
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const secureStorage = {
  // Web: localStorage (AsyncStorage)
  // iOS/Android: Encrypted keychain (SecureStore)
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      return AsyncStorage.setItem(key, value);
    }
    return SecureStore.setItemAsync(key, value);
  },

  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return AsyncStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },

  async removeItem(key: string) {
    if (Platform.OS === 'web') {
      return AsyncStorage.removeItem(key);
    }
    return SecureStore.deleteItemAsync(key);
  },
};
```

## Emotion Native Styling

```typescript
// ✅ CORRECT
import styled from '@emotion/native';
import { colors, spacing, radii } from '@tavia/taviax';

const Container = styled.View`
  background-color: ${colors.mainColor};
  padding: ${spacing.base}px;
  border-radius: ${radii.md}px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.light};
`;

// ❌ WRONG - Don't use @emotion/styled (web-only)
import styled from '@emotion/styled';
```

## API Configuration (.env)

```env
# Physical devices (Expo Go on phone)
EXPO_PUBLIC_API_URL=http://192.168.1.16:3000  # Your local IP

# Web/iOS Simulator/Android Emulator
EXPO_PUBLIC_API_URL=http://localhost:3000

# Android Emulator (alternative)
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

## Critical Rules

1. ✅ Use `@tavia/taviax` components, NOT `@tavia/taviad`
2. ✅ Import from `@emotion/native`, NOT `@emotion/styled`
3. ✅ Use `secureStorage` abstraction for auth tokens
4. ✅ Physical devices require local IP (same WiFi)
5. ✅ Use `react-native-web` alias in vitest.config.ts
6. ✅ Coverage threshold: 70% (lower than web's 80%)
7. ❌ Never use `@tavia/taviad` in mobile
8. ❌ Don't hardcode localhost - use `.env` with `EXPO_PUBLIC_`

## Running Mobile App

```bash
cd apps/mobile

# 1. Skip Expo login
set EXPO_OFFLINE=1  # Windows
# export EXPO_OFFLINE=1  # Mac/Linux

# 2. Start Metro bundler
pnpm start

# 3. Choose platform
# - Press 'w' for web (localhost:8081)
# - Press 'i' for iOS simulator (Mac only)
# - Press 'a' for Android emulator
# - Scan QR with Expo Go (physical device)
```

## Test Accounts

- **Attendees**: `attendee1@tavia.io`, `attendee2@tavia.io` (password:
  `attendee123`)
- **Organizer (Free)**: `organizer.free@tavia.io` (password: `organizer123`)
- **Organizer (Premium)**: `organizer.pro@tavia.io` (password: `organizer123`)
- **Admin**: `admin@tavia.io` (password: `admin123`)

**Mobile uses backoffice API** (`/api/mobile/*` routes with CORS enabled)
