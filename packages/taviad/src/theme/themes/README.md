# Gaming Theme

A vibrant, energetic theme for gaming and entertainment applications.

## Colors

**Primary Color:** Electric Blue (`#3B82F6`)

This theme uses an electric blue as the main brand color, perfect for:

- Gaming applications
- Entertainment platforms
- Tech-forward products
- Energy drinks/sports brands

## Usage

### Import the theme

```typescript
import {
  gamingLightTheme,
  gamingDarkTheme,
  gamingCssVars,
} from '@tavia/taviad';
```

### Use with ThemeProvider

```tsx
import { ThemeProvider } from '@emotion/react';
import { gamingLightTheme } from '@tavia/taviad';

function App() {
  return (
    <ThemeProvider theme={gamingLightTheme}>{/* Your app */}</ThemeProvider>
  );
}
```

### Use cssVars directly

```tsx
import styled from '@emotion/styled';
import { gamingCssVars } from '@tavia/taviad';

const Button = styled.button`
  background-color: ${gamingCssVars.mainColor};
  color: white;

  &:hover {
    background-color: ${gamingCssVars.mainColorDark};
  }
`;
```

## Color Palette

### Brand Colors

- **Main**: `#3B82F6` (Electric Blue)
- **Main Dark**: `#2563EB`
- **Main Light**: `#60A5FA`

### Light Variants

- `mainColorLight`: `#60A5FA`
- `mainColorLight2`: `#93C5FD`
- `mainColorLight3`: `#BFDBFE`
- `mainColorLight4`: `#DBEAFE`
- `mainColorLight5`: `#EFF6FF`

### Dark Variants

- `mainColorDark`: `#2563EB`
- `mainColorDark2`: `#1D4ED8`
- `mainColorDark3`: `#1E40AF`
- `mainColorDark4`: `#1E3A8A`

## Differences from Default Theme

The gaming theme uses the same structure as the default theme but with:

- **Electric Blue** (`#3B82F6`) instead of Coral Red (`#ff695c`)
- Blue-based gradients
- Same semantic colors (success, warning, danger, etc.)
- Same gray scale
- Same spacing, typography, and other design tokens

## Example: Wevra App

To use the gaming theme in your app:

```tsx
// apps/wevra/src/components/ClientProviders.tsx
import { ThemeProvider } from '@emotion/react';
import { gamingLightTheme } from '@tavia/taviad';

export function ClientProviders({ children }) {
  return (
    <ThemeProvider theme={gamingLightTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
```

Or use the cssVars directly without ThemeProvider:

```tsx
import { gamingCssVars } from '@tavia/taviad';

const Button = styled.button`
  background: ${gamingCssVars.mainColor};
`;
```
