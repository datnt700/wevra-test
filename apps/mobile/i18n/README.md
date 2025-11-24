# Internationalization (i18n) in Tavia Mobile

## Overview

Tavia Mobile uses **expo-localization** and **i18n-js** to provide automatic
language detection based on the user's system language.

## Supported Languages

- **English (en)** - Default
- **Vietnamese (vi)**

## How It Works

The app automatically detects the user's device language using
`expo-localization` and loads the appropriate translations. If the detected
language is not supported, it falls back to English.

## Configuration

### Setup Location

- **Config**: `apps/mobile/i18n/index.ts`
- **Translations**: `apps/mobile/i18n/translations/`
  - `en.json` - English translations
  - `vi.json` - Vietnamese translations

### Usage in Components

```tsx
import i18n from '@/i18n';

// Simple translation
const title = i18n.t('auth.login.title'); // "Welcome back" or "Chào mừng trở lại"

// Translation with variables
const message = i18n.t('auth.social.comingSoonMessage', {
  provider: 'Google',
  mode: 'login',
});
```

## Translation Structure

Translations are organized by feature area:

```json
{
  "common": {
    "appName": "Tavia",
    "loading": "Loading...",
    "retry": "Try Again",
    ...
  },
  "auth": {
    "login": {
      "title": "Welcome back",
      "email": "Email",
      ...
    },
    "signup": { ... },
    "social": { ... },
    "validation": { ... },
    "errors": { ... }
  }
}
```

## Adding New Translations

1. **Add to English** (`i18n/translations/en.json`):

```json
{
  "feature": {
    "key": "English text"
  }
}
```

2. **Add to Vietnamese** (`i18n/translations/vi.json`):

```json
{
  "feature": {
    "key": "Văn bản tiếng Việt"
  }
}
```

3. **Use in component**:

```tsx
import i18n from '@/i18n';

const text = i18n.t('feature.key');
```

## Manual Language Change

To allow users to manually change the language:

```tsx
import { setLocale } from '@/i18n';

// Change to Vietnamese
setLocale('vi');

// Change to English
setLocale('en');

// Get current locale
import { getCurrentLocale } from '@/i18n';
const currentLang = getCurrentLocale();
```

## Best Practices

1. **Always use translations** - Never hardcode user-facing text
2. **Organize by feature** - Group related translations together
3. **Use descriptive keys** - Make translation keys self-documenting
4. **Test both languages** - Verify layouts work in both English and Vietnamese
5. **Keep translations in sync** - Update both language files simultaneously

## Testing

To test different languages on your device:

1. **iOS**: Settings → General → Language & Region → iPhone Language
2. **Android**: Settings → System → Languages & input → Languages

The app will automatically detect and use the selected language on next launch.

## Future Enhancements

- Add more languages (French, Spanish, etc.)
- Implement in-app language switcher
- Use RTL (Right-to-Left) support for Arabic
- Add pluralization support for countable items
- Date/time localization with `expo-localization`
