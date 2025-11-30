# Eventure Mobile App (@Eventure/mobile)

> Community networking platform for event discovery and participation - Mobile
> app for ATTENDEE users

React Native + Expo SDK 54 mobile application for attendees to discover events,
join communities, and participate in activities.

## 🎯 Platform Overview

**Two-sided platform with Freemium model:**

- **Backoffice** (Port 3000): Admin/Organizer/Moderator - Create groups, host
  events, manage communities
- **Frontoffice** (Port 3003): Attendee - Web event discovery (shares database
  with backoffice)
- **Mobile** (This app): Attendee - Native mobile experience with offline
  support

**Business Model:**

- **Attendees**: Always FREE with unlimited access to all events and groups
- **Organizers**: Freemium (Free: 1 group/50 members/2 events per month,
  Premium: Unlimited)

## 🚀 Quick Start

### Prerequisites

- Node.js 22.17.1+ (check with `node -v`)
- pnpm 10.19.0+ (check with `pnpm -v`)
- Expo Go app on your phone (iOS/Android)
- Backoffice API running (port 3000)

### 1. Install Dependencies

```bash
cd apps/mobile
pnpm install
```

### 2. Configure Environment

**Create `.env` file:**

```bash
cp .env.example .env
```

**Update API URL** based on your testing platform:

```env
# For physical devices (Expo Go on phone):
EXPO_PUBLIC_API_URL=http://192.168.1.16:3000  # Your computer's local IP

# For web browser / iOS Simulator:
EXPO_PUBLIC_API_URL=http://localhost:3000

# For Android Emulator:
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

**Finding your local IP:**

```bash
# Windows
ipconfig  # Look for IPv4 Address under Wi-Fi adapter

# Mac/Linux
ifconfig  # Look for inet under en0 (WiFi)
```

**Environment Files:**

Expo supports multiple environment files (see `ENV_GUIDE.md` for details):

- `.env.example` - Template with all variables (committed)
- `.env` - Your local environment (gitignored)
- `.env.local` - Local overrides (gitignored)
- `.env.development` - Development config (committed)
- `.env.production` - Production config (committed)

**Available Variables:**

```env
# API Configuration
EXPO_PUBLIC_API_URL=http://192.168.1.16:3000
EXPO_PUBLIC_ANALYTICS_API_URL=http://192.168.1.16:3001

# OAuth Providers
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
EXPO_PUBLIC_FACEBOOK_CLIENT_ID=your_facebook_app_id
# Apple Sign In configured in app.json (no env var needed)

# Analytics
EXPO_PUBLIC_ANALYTICS_API_KEY=your-api-key
EXPO_PUBLIC_ENABLE_ANALYTICS=true

# App Configuration
EXPO_PUBLIC_APP_NAME=Eventure Mobile
EXPO_PUBLIC_APP_VERSION=0.1.0
EXPO_PUBLIC_ENVIRONMENT=development

# Feature Flags
EXPO_PUBLIC_ENABLE_DEBUG=true
EXPO_PUBLIC_ENABLE_PERFORMANCE_MONITORING=false

# Build-Time Variables (app.config.js only - NOT exposed to client)
APP_VARIANT=development
SENTRY_AUTH_TOKEN=secret-token
```

**Security Notes:**

- ✅ **EXPO*PUBLIC*** prefix: Variables exposed to client code
- ❌ **No prefix**: Build-time only (app.config.js), not exposed to client
- ⚠️ Never store secrets in `EXPO_PUBLIC_` variables (visible in compiled app)

**EAS Environment System:**

For CI/CD with EAS Build/Update:

```bash
# Pull EAS environment variables to local .env
eas env:pull --environment development

# Create EAS environment variable
eas env:create --name EXPO_PUBLIC_API_URL --value https://api.eventure.so --environment production

# Build with EAS environment
eas build --profile production  # Uses EAS production environment

# Publish update with EAS environment
eas update --environment production
```

📖 **See `ENV_GUIDE.md` for complete environment variables documentation**

### 3. Start Backend API

The mobile app uses backoffice authentication endpoints:

```bash
cd apps/backoffice
pnpm docker:up    # Start PostgreSQL
pnpm db:migrate   # Run migrations
pnpm dev          # Start API on port 3000
```

### 4. Start Metro Bundler

```bash
cd apps/mobile
set EXPO_OFFLINE=1  # Windows (skip Expo login)
# export EXPO_OFFLINE=1  # Mac/Linux

pnpm start
```

**Metro Commands:**

- `w` - Open in web browser (http://localhost:8081)
- `i` - Open in iOS simulator (Mac only)
- `a` - Open in Android emulator
- `r` - Reload app
- `m` - Toggle menu
- Scan QR code with Expo Go app for physical device

### 5. Login

Use any attendee account from seed data:

- **Email**: `attendee1@eventure.so`
- **Password**: `attendee123`

Other test accounts: `attendee2@eventure.so`, `attendee3@eventure.so` (same
password)

## 📱 Platform-Specific Notes

### Web Development (http://localhost:8081)

- **Storage**: Uses `@react-native-async-storage/async-storage` (localStorage
  wrapper)
- **API URL**: `http://localhost:3000` (change in `.env`)
- **Testing**: Open DevTools → Application → Local Storage → check `userToken`

### Physical Device (iOS/Android via Expo Go)

- **Storage**: Uses `expo-secure-store` (encrypted OS keychain - iOS
  Keychain/Android Keystore)
- **API URL**: `http://192.168.1.16:3000` (your computer's local IP)
- **Requirements**:
  - Both devices on same WiFi network
  - Backoffice API running on your computer
  - Firewall allows incoming connections on port 3000

### Simulators/Emulators

- **iOS Simulator** (Mac only): Uses `localhost` (like web)
- **Android Emulator**: Use `10.0.2.2` instead of `localhost`, or your local IP

## 🏗️ Project Structure

```
apps/mobile/
├── app/
│   ├── (auth)/              # Authentication flow
│   │   ├── _layout.tsx      # Auth layout
│   │   ├── login.tsx        # Login screen
│   │   └── signup.tsx       # Registration screen
│   ├── (tabs)/              # Main authenticated app
│   │   ├── _layout.tsx      # Tab navigation
│   │   ├── index.tsx        # Home/Events feed
│   │   ├── explore.tsx      # Discover events
│   │   └── profile.tsx      # User profile
│   ├── _layout.tsx          # Root layout
│   └── +not-found.tsx       # 404 page
├── components/              # Reusable React components
├── constants/               # App constants (Colors, etc.)
├── hooks/                   # Custom React hooks
├── utils/
│   └── secureStorage.ts     # Platform-specific storage wrapper
├── assets/                  # Images, fonts, icons
├── .env                     # Environment variables (⚠️ update API URL here)
├── app.json                 # Expo configuration
└── package.json
```

## 🔐 Authentication Architecture

### JWT Token-Based Authentication

**Endpoints** (all in `apps/backoffice/src/app/api/mobile/`):

- **POST** `/api/mobile/login` - Authenticate user, returns JWT token (30-day
  expiry)
- **POST** `/api/mobile/register` - Create new ATTENDEE account
- **POST** `/api/mobile/verify` - Verify JWT token validity

**Response Format:**

```json
// Success
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "cm123...",
      "email": "attendee1@eventure.so",
      "role": "ATTENDEE"
    }
  }
}

// Error
{
  "success": false,
  "error": {
    "message": "Invalid credentials",
    "code": "UNAUTHORIZED"
  }
}
```

### Storage Strategy

**Platform-aware wrapper** (`utils/secureStorage.ts`):

```typescript
import * as SecureStorage from '@/utils/secureStorage';

// Store token (platform-specific under the hood)
await SecureStorage.setItemAsync('userToken', token);

// Retrieve token
const token = await SecureStorage.getItemAsync('userToken');

// Delete token
await SecureStorage.deleteItemAsync('userToken');

// Clear all
await SecureStorage.clearAll();
```

**Implementation:**

- **Native (iOS/Android)**: `expo-secure-store` → Encrypted keychain (iOS
  Keychain/Android Keystore)
- **Web**: `@react-native-async-storage/async-storage` → localStorage

## 📦 Key Dependencies

```json
{
  "expo": "catalog:expo", // Expo SDK 54
  "react-native": "catalog:expo", // React Native 0.81.5
  "expo-router": "catalog:expo", // File-based routing
  "expo-secure-store": "catalog:expo", // Encrypted storage (native)
  "@react-native-async-storage/async-storage": "catalog:expo", // Storage (web)
  "@Eventure/analytics": "workspace:*" // Analytics SDK
}
```

## 🧪 Testing

### Manual Testing Checklist

**Web Platform:**

- [ ] Open http://localhost:8081 in browser
- [ ] Navigate to login screen
- [ ] Enter `attendee1@eventure.so` / `attendee123`
- [ ] Verify successful login and navigation to tabs
- [ ] Check localStorage in DevTools (Application tab) for `userToken`

**Physical Device:**

- [ ] Update `.env` with local IP (e.g., `http://192.168.1.16:3000`)
- [ ] Ensure phone and computer on same WiFi
- [ ] Restart Metro after `.env` change
- [ ] Scan QR code with Expo Go
- [ ] Test login flow
- [ ] Verify secure token storage (iOS Keychain/Android Keystore)

### Unit Tests

```bash
pnpm test              # Run Jest tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

## 🐛 Common Issues

### "Network request failed" on Physical Device

**Problem**: Device can't reach `http://localhost:3000`

**Solution:**

1. Update `.env` with your computer's local IP:
   ```env
   EXPO_PUBLIC_API_URL=http://192.168.1.16:3000  # Your IP
   ```
2. Ensure both devices on same WiFi network
3. Restart Metro: `pnpm start`
4. Check firewall allows port 3000

### "ExpoSecureStore is not a function" on Web

**Problem**: `expo-secure-store` doesn't work on web platform

**Solution**: Already fixed! The app uses `AsyncStorage` automatically on web.
If you see this error:

1. Restart Metro bundler (press `r` or `Ctrl+C` → `pnpm start`)
2. Clear Metro cache: `pnpm start --clear`

### Metro Cache Issues

**Symptoms**: New dependencies not loading, old code persisting

**Solution:**

```bash
# Clear cache and restart
pnpm start --clear

# Or manual cleanup
Remove-Item -Recurse -Force node_modules/.cache  # PowerShell
rm -rf node_modules/.cache                       # Mac/Linux
pnpm start
```

### "Token expired" Error

**Problem**: JWT token expired (30-day lifetime)

**Solution**: Re-login to get new token. Token expiry handling coming soon with
auto-refresh logic.

### Android Emulator "Network request failed"

**Problem**: Android emulator can't reach `localhost`

**Solution**: Use `10.0.2.2` instead:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

## 🚧 Development Roadmap

### Phase 1: Core Authentication ✅

- [x] JWT-based login/register
- [x] Platform-specific secure storage
- [x] CORS support for mobile API
- [x] Standardized error handling

### Phase 2: State Management (In Progress)

- [ ] Create auth context (`context/AuthContext.tsx`)
- [ ] Global user state management
- [ ] Token refresh logic (2-day expiry warning)
- [ ] Auto-logout on token expiration
- [ ] Route guards (protect authenticated routes)

### Phase 3: Features

- [ ] Event discovery feed
- [ ] Event detail view with RSVP
- [ ] Group browsing and joining
- [ ] User profile management
- [ ] Push notifications
- [ ] Offline support with local storage
- [ ] Image caching and optimization

### Phase 4: Polish

- [ ] Splash screen and onboarding
- [ ] Deep linking support
- [ ] Analytics integration
- [ ] Error boundary and crash reporting
- [ ] Performance optimization
- [ ] Dark mode support

## 📝 Development Commands

```bash
# Development
pnpm start              # Start Metro bundler
pnpm start --clear      # Clear cache and start
pnpm android            # Run on Android device/emulator
pnpm ios                # Run on iOS simulator (Mac only)
pnpm web                # Run on web browser

# Code Quality
pnpm lint               # ESLint 9
pnpm lint:fix           # Auto-fix
pnpm type-check         # TypeScript

# Testing
pnpm test               # Jest tests
pnpm test:watch         # Watch mode
pnpm test:coverage      # Coverage report

# Building
pnpm prebuild           # Generate native code
pnpm build:android      # Build Android APK
pnpm build:ios          # Build iOS IPA (Mac only)

# Cleanup
Remove-Item -Recurse -Force .expo, node_modules  # Full cleanup (Windows)
rm -rf .expo node_modules                        # Full cleanup (Mac/Linux)
pnpm install                                     # Reinstall
```

## 🔗 Related Documentation

- **Main Copilot Instructions**: `.github/copilot-instructions.md`
- **Authentication Guide**: `docs/AUTHENTICATION.md`
- **Component Library**: `packages/eventured/README.md` (web only - not used in
  mobile)
- **Mobile UI Components**: `packages/eventurex/README.md` (React Native
  components)
- **Analytics SDK**: `packages/analytics/README.md`

## 🏢 Architecture Context

**Eventure Platform:**

- **Shared Database**: Backoffice and frontoffice use same PostgreSQL "Eventure"
  database
- **API Strategy**: Mobile app consumes backoffice REST API (not frontoffice)
- **Role Separation**: ADMIN/ORGANIZER/MODERATOR → Backoffice, ATTENDEE →
  Frontoffice + Mobile
- **Monorepo**: pnpm workspace with Turborepo build pipeline

**Mobile-Specific:**

- **File-based routing**: Expo Router (similar to Next.js App Router)
- **No @Eventure/eventured**: Web components not compatible, use
  `@Eventure/eventurex` for mobile UI
- **Platform detection**: `Platform.OS` for web vs native code paths
- **Environment**: `EXPO_PUBLIC_*` prefix for client-accessible env vars

## 🤝 Contributing

1. **Branch naming**: `feat/your-feature` or `fix/your-bug`
2. **Commits**: Use Commitizen (`pnpm commit` from root) for conventional
   commits
3. **Code style**: ESLint 9 + Prettier (auto-format on commit)
4. **Testing**: Add tests for new features
5. **PR checklist**:
   - [ ] Tests pass (`pnpm test`)
   - [ ] Linter passes (`pnpm lint`)
   - [ ] TypeScript passes (`pnpm type-check`)
   - [ ] Tested on web and physical device
   - [ ] Updated README if needed

## 📄 License

MIT License - See LICENSE file in repository root

---

**Need help?** Check the main project README or contact the team.
