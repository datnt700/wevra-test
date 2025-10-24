# Tavia Mobile App

A mobile application for Tavia, built with Expo and React Native.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start Expo dev server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android

# Run on web
pnpm web
```

## 📱 Development

### Environment Setup

1. Copy `.env.example` to `.env`
2. Update API endpoints:
   ```env
   EXPO_PUBLIC_API_URL=https://your-api.com
   EXPO_PUBLIC_ANALYTICS_API_URL=https://your-analytics-api.com
   ```

### Project Structure

```
├── app/                  # Expo Router screens
│   ├── (tabs)/          # Tab-based navigation
│   ├── _layout.tsx      # Root layout
│   └── +not-found.tsx   # 404 screen
├── components/           # Reusable components
├── constants/            # App constants and theme
├── hooks/                # Custom React hooks
├── lib/                  # Utilities (API client)
├── assets/               # Images, fonts
└── tests/                # Test files
```

### Available Scripts

```bash
pnpm start          # Start Expo dev server
pnpm ios            # Run on iOS simulator
pnpm android        # Run on Android emulator
pnpm web            # Run on web browser
pnpm test           # Run tests
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Generate coverage report
pnpm lint           # Lint code
pnpm type-check     # TypeScript check
pnpm format         # Format code
```

## 🧪 Testing

Tests are written using Jest and React Native Testing Library:

```bash
pnpm test
pnpm test:coverage
```

Coverage threshold: 70%

## 🎨 Theming

The app supports light and dark modes. Theme colors are defined in
`constants/Colors.ts`.

### Using Themed Components

```typescript
import { ThemedText, ThemedView } from '@/components';

<ThemedView style={styles.container}>
  <ThemedText type="title">Hello!</ThemedText>
</ThemedView>
```

## 🔌 API Integration

Use the API client from `lib/api.ts`:

```typescript
import { api } from '@/lib/api';

// GET request
const data = await api.get<YourType>('/endpoint');

// POST request
const result = await api.post<YourType>('/endpoint', { data });
```

## 📊 Analytics

This app integrates with `@tavia/analytics`:

```typescript
import { AnalyticsProvider, useAnalytics } from '@tavia/analytics';

// Wrap your app
<AnalyticsProvider apiUrl={process.env.EXPO_PUBLIC_ANALYTICS_API_URL}>
  <YourApp />
</AnalyticsProvider>

// Track events
const { trackClick } = useAnalytics();
trackClick('button', 'Book Table', { restaurantId: '123' });
```

## 🚢 Deployment

### iOS

1. Configure `app.json` with your bundle identifier
2. Run `eas build --platform ios`
3. Submit to App Store with `eas submit --platform ios`

### Android

1. Configure `app.json` with your package name
2. Run `eas build --platform android`
3. Submit to Google Play with `eas submit --platform android`

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)
- [Tavia Monorepo](../../README.md)

## 🤝 Contributing

Follow Tavia's coding standards:

- Use TypeScript
- Write tests (70% coverage minimum)
- Use conventional commits (`pnpm commit`)
- Follow ESLint rules

---

Built with ❤️ for the Tavia ecosystem
