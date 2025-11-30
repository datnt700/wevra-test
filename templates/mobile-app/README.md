# Eventure Mobile App Template (Expo)

**Note:** This template uses Expo's official generator (`npx create-expo-app`)
and then customizes it for the Eventure monorepo. You don't need to manually use
this directory - the `pnpm create:mobile` script handles everything.

## 🎯 What Gets Generated

When you run `pnpm create:mobile <app-name>`, the script:

1. **Runs Expo's official generator** with your chosen template (Blank, Tabs, or
   Drawer)
2. **Customizes the generated app** for Eventure monorepo integration
3. **Adds Eventure-specific utilities** and configurations

## 🏗️ Generated Structure

```
apps/<your-app-name>/
├── app/                      # Expo Router (file-based routing)
│   ├── (tabs)/              # Tab-based screens (if Tabs template)
│   │   ├── index.tsx        # Home screen
│   │   └── explore.tsx      # Explore screen
│   ├── _layout.tsx          # Root layout
│   ├── +not-found.tsx       # 404 screen
│   └── +html.tsx            # HTML wrapper (web support)
├── components/               # Reusable components
│   ├── ThemedText.tsx       # Themed text component
│   ├── ThemedView.tsx       # Themed view component
│   └── ...
├── constants/                # App constants
│   └── Colors.ts            # Theme colors
├── hooks/                    # Custom React hooks
│   ├── useColorScheme.ts    # Color scheme hook (added by Eventure)
│   └── ...
├── utils/                    # Utility functions (added by Eventure)
│   └── api.ts               # API client for backend communication
├── assets/                   # Static assets
│   ├── images/
│   └── fonts/
├── __tests__/                # Test files (added by Eventure)
│   └── example.test.tsx     # Example test
├── .env.example              # Environment variables template (added by Eventure)
├── .env                      # Environment variables (added by Eventure)
├── app.json                  # Expo configuration
├── babel.config.js           # Babel configuration
├── eslint.config.js          # ESLint 9 flat config (added by Eventure)
├── jest.config.js            # Jest configuration (added by Eventure)
├── jest.setup.js             # Jest setup file (added by Eventure)
├── package.json              # Dependencies with catalog references (updated by Eventure)
├── tsconfig.json             # TypeScript config extending Eventure base (updated by Eventure)
└── README.md                 # App-specific documentation
```

## 📦 Eventure Customizations

### 1. **Package.json**

- Name updated to `@Eventure/<app-name>`
- Catalog dependencies from `pnpm-workspace.yaml`
- Workspace packages: `@Eventure/analytics`
- Additional scripts: `lint`, `type-check`, `format`, `test:coverage`

```json
{
  "name": "@Eventure/customer-app",
  "dependencies": {
    "@Eventure/analytics": "workspace:*",
    "expo": "catalog:expo",
    "react": "catalog:",
    "zod": "catalog:"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "eslint": "catalog:",
    "typescript": "catalog:"
  }
}
```

### 2. **ESLint Config (eslint.config.js)**

Follows Eventure's ESLint 9 flat config pattern:

```javascript
import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    ignores: ['node_modules/**', '.expo/**', 'android/**', 'ios/**'],
  },
];
```

### 3. **TypeScript Config (tsconfig.json)**

Extends Eventure's base TypeScript configuration:

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "strict": true
  }
}
```

### 4. **Environment Variables (.env.example)**

Pre-configured with Eventure API endpoints:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ANALYTICS_API_URL=http://localhost:3001
EXPO_PUBLIC_ANALYTICS_API_KEY=your-analytics-api-key-here
```

### 5. **Testing Setup**

- Jest configured with `jest-expo` preset
- React Native Testing Library
- 70% coverage threshold
- Example test included

```javascript
// jest.config.js
module.exports = {
  preset: 'jest-expo',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### 6. **API Client Utility (utils/api.ts)**

Ready-to-use API client for backend communication:

```typescript
export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },
  // ... post, put, delete methods
};
```

### 7. **Custom Hooks**

- `useColorScheme()` - Theme-aware color scheme detection

## 🚀 Usage

### Generate Mobile App

```bash
# From monorepo root
pnpm create:mobile customer-app
```

### Choose Template

You'll be prompted to select:

1. **Blank (TypeScript)** - Minimal setup, single screen
2. **Tabs (TypeScript)** - Bottom tabs navigation (recommended)
3. **Drawer (TypeScript)** - Side drawer navigation

### Development Workflow

```bash
cd apps/customer-app

# Start Expo dev server
pnpm start

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android

# Run on web browser
pnpm web

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Lint code
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format
```

## 🔧 Customization Points

After generation, customize these files for your specific app:

### 1. **app.json**

Update app metadata:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "icon": "./assets/images/icon.png",
    "splash": {
      "image": "./assets/images/splash.png"
    }
  }
}
```

### 2. **.env**

Configure API endpoints for your environment:

```env
EXPO_PUBLIC_API_URL=https://api.yourdomain.com
EXPO_PUBLIC_ANALYTICS_API_URL=https://analytics.yourdomain.com
```

### 3. **app/ Directory**

Add your screens and navigation:

```
app/
├── (auth)/              # Auth-protected routes
│   ├── profile.tsx
│   └── settings.tsx
├── (tabs)/              # Tab navigation
│   ├── index.tsx        # Home
│   ├── bookings.tsx     # Bookings
│   └── restaurants.tsx  # Restaurants
└── restaurant/
    └── [id].tsx         # Dynamic route
```

### 4. **components/**

Add your custom components following Eventure patterns:

```typescript
// components/RestaurantCard.tsx
import { ThemedView, ThemedText } from '@/components';

export function RestaurantCard({ restaurant }) {
  return (
    <ThemedView>
      <ThemedText>{restaurant.name}</ThemedText>
    </ThemedView>
  );
}
```

## 📱 Expo Router Features

The generated app uses Expo Router for file-based routing (similar to Next.js
App Router):

```typescript
// Navigation examples
import { router } from 'expo-router';

// Navigate to a screen
router.push('/restaurant/123');

// Navigate back
router.back();

// Replace current route
router.replace('/home');
```

## 🧪 Testing Best Practices

Write tests for your components:

```typescript
// __tests__/RestaurantCard.test.tsx
import { render } from '@testing-library/react-native';
import { RestaurantCard } from '@/components/RestaurantCard';

describe('RestaurantCard', () => {
  it('should render restaurant name', () => {
    const restaurant = { name: 'Test Cafe' };
    const { getByText } = render(<RestaurantCard restaurant={restaurant} />);
    expect(getByText('Test Cafe')).toBeTruthy();
  });
});
```

## 🔗 Integration with Eventure Backend

### Using @Eventure/analytics

```typescript
import { AnalyticsProvider, useAnalytics } from '@Eventure/analytics';

// Wrap your app
<AnalyticsProvider apiUrl={process.env.EXPO_PUBLIC_ANALYTICS_API_URL}>
  <YourApp />
</AnalyticsProvider>

// Track events
const { trackClick } = useAnalytics();
trackClick('button', 'Book Table', { restaurantId: '123' });
```

### API Client

```typescript
import { api } from '@/utils/api';

// Fetch restaurants
const restaurants = await api.get<Restaurant[]>('/api/restaurants');

// Create booking
const booking = await api.post<Booking>('/api/bookings', {
  restaurantId: '123',
  date: '2024-10-25',
});
```

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [Eventure Monorepo Guide](../../README.md)
- [Testing with React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

## 🤝 Contributing

When making changes that should be applied to all mobile apps:

1. Test the generator script thoroughly
2. Update this README
3. Document breaking changes
4. Update `.github/copilot-instructions.md`

## ⚠️ Important Notes

- **Do not manually modify files in `templates/mobile-app/`** - This directory
  is mainly documentation. The generator uses Expo's official CLI.
- **Always use `pnpm create:mobile`** - Don't manually copy files
- **Update .env after generation** - Configure your specific API endpoints
- **Test on both iOS and Android** - Cross-platform testing is essential

---

**Generated with ❤️ for the Eventure ecosystem**
