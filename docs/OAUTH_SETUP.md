# OAuth Setup Guide

Complete guide to setting up Google, Apple, and Facebook OAuth for Tavia apps.

## Overview

OAuth is implemented across three apps:

- **Backoffice** (organizer/admin login)
- **Frontoffice** (attendee login)
- **Mobile** (attendee login)

## Prerequisites

1. Domain/URLs ready:
   - Backoffice: `http://localhost:3000` (dev) or `https://admin.tavia.io`
     (prod)
   - Frontoffice: `http://localhost:3003` (dev) or `https://tavia.io` (prod)
   - Mobile: `tavia://auth/callback` (deep link)

2. Environment variables configured in `.env` files

## Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "Tavia OAuth"
3. Enable Google+ API

### Step 2: Create OAuth Credentials

1. Navigate to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client ID**
3. Configure OAuth consent screen:
   - **User Type**: External
   - **App name**: Tavia
   - **User support email**: Your email
   - **Developer contact**: Your email
   - **Scopes**: `email`, `profile`
4. Create OAuth Client IDs for each platform:

**Web Application (Backoffice)**:

- **Type**: Web application
- **Name**: Tavia Backoffice
- **Authorized redirect URIs**:
  - `http://localhost:3000/api/auth/callback/google` (dev)
  - `https://admin.tavia.io/api/auth/callback/google` (prod)
- Copy **Client ID** and **Client Secret**

**Web Application (Frontoffice)**:

- **Type**: Web application
- **Name**: Tavia Frontoffice
- **Authorized redirect URIs**:
  - `http://localhost:3003/api/auth/callback/google` (dev)
  - `https://tavia.io/api/auth/callback/google` (prod)
- Copy **Client ID** and **Client Secret**

**iOS Application (Mobile)**:

- **Type**: iOS
- **Name**: Tavia Mobile iOS
- **Bundle ID**: `com.tavia.app` (from app.json)
- Copy **Client ID**

**Android Application (Mobile)**:

- **Type**: Android
- **Name**: Tavia Mobile Android
- **Package name**: `com.tavia.app`
- **SHA-1 fingerprint**: Get from `keytool` or Expo
- Copy **Client ID**

### Step 3: Add to Environment Variables

**Backoffice** (`.env`):

```env
GOOGLE_CLIENT_ID=your_web_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_web_client_secret_here
```

**Frontoffice** (`.env`):

```env
GOOGLE_CLIENT_ID=your_web_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_web_client_secret_here
```

**Mobile** (`.env`):

```env
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_ios_client_id_here.apps.googleusercontent.com
```

## Apple Sign In Setup

### Step 1: Apple Developer Account

1. Enroll in [Apple Developer Program](https://developer.apple.com/programs/)
   ($99/year)
2. Create **App ID** with Sign in with Apple capability

### Step 2: Configure Service ID (for Web)

1. Go to
   [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/)
2. Create **Services ID**:
   - **Description**: Tavia Web Auth
   - **Identifier**: `com.tavia.web`
3. Configure Sign in with Apple:
   - **Domains**: `admin.tavia.io`, `tavia.io`
   - **Return URLs**:
     - `http://localhost:3000/api/auth/callback/apple`
     - `https://admin.tavia.io/api/auth/callback/apple`
     - `http://localhost:3003/api/auth/callback/apple`
     - `https://tavia.io/api/auth/callback/apple`

### Step 3: Create Key for Client Secret

1. Go to **Keys** section
2. Register new key:
   - **Name**: Tavia Apple Auth Key
   - **Enable**: Sign in with Apple
   - **Configure**: Select Service ID created above
3. Download `.p8` key file (keep secure!)
4. Note **Key ID** and **Team ID**

### Step 4: Generate Client Secret (JWT)

Apple requires a JWT token as client secret. Use this script:

```javascript
// generate-apple-secret.js
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('AuthKey_XXXXXXXXXX.p8', 'utf8');

const token = jwt.sign(
  {
    iss: 'YOUR_TEAM_ID',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 15777000, // 6 months
    aud: 'https://appleid.apple.com',
    sub: 'com.tavia.web', // Your Service ID
  },
  privateKey,
  {
    algorithm: 'ES256',
    header: {
      alg: 'ES256',
      kid: 'YOUR_KEY_ID', // From step 3
    },
  }
);

console.log('Apple Client Secret:', token);
```

Run: `node generate-apple-secret.js`

### Step 5: Add to Environment Variables

**Backoffice/Frontoffice** (`.env`):

```env
APPLE_CLIENT_ID=com.tavia.web
APPLE_CLIENT_SECRET=eyJhbGciOiJFUzI1NiIsImtpZCI6IktFWV9JRCJ9... (JWT from step 4)
```

**Mobile**: Apple Sign In works automatically with Expo - no credentials needed!

### Step 6: Update app.json (Mobile)

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.tavia.app",
      "usesAppleSignIn": true
    }
  }
}
```

## Facebook OAuth Setup

### Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create new app:
   - **Type**: Consumer
   - **Name**: Tavia
   - **Contact Email**: Your email

### Step 2: Configure Facebook Login

1. Add **Facebook Login** product
2. Configure settings:
   - **Valid OAuth Redirect URIs**:
     - `http://localhost:3000/api/auth/callback/facebook`
     - `https://admin.tavia.io/api/auth/callback/facebook`
     - `http://localhost:3003/api/auth/callback/facebook`
     - `https://tavia.io/api/auth/callback/facebook`

### Step 3: Get App Credentials

1. Go to **Settings > Basic**
2. Copy **App ID** and **App Secret**

### Step 4: Add to Environment Variables

**Backoffice/Frontoffice** (`.env`):

```env
FACEBOOK_CLIENT_ID=your_app_id_here
FACEBOOK_CLIENT_SECRET=your_app_secret_here
```

**Mobile** (`.env`):

```env
EXPO_PUBLIC_FACEBOOK_CLIENT_ID=your_app_id_here
```

### Step 5: Update app.json (Mobile)

```json
{
  "expo": {
    "facebookScheme": "fb{YOUR_FACEBOOK_APP_ID}",
    "facebookAppId": "{YOUR_FACEBOOK_APP_ID}",
    "facebookDisplayName": "Tavia"
  }
}
```

## Environment Files Summary

### Backoffice (`.env`)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tavia

# NextAuth
NEXTAUTH_SECRET=your_32_char_secret_here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
APPLE_CLIENT_ID=com.tavia.web
APPLE_CLIENT_SECRET=eyJhbGciOiJFUzI1NiIs...
FACEBOOK_CLIENT_ID=123456789
FACEBOOK_CLIENT_SECRET=abcdef123456
```

### Frontoffice (`.env`)

```env
# Database (shared with backoffice)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tavia

# NextAuth
NEXTAUTH_SECRET=your_32_char_secret_here
NEXTAUTH_URL=http://localhost:3003

# OAuth Providers (same as backoffice)
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
APPLE_CLIENT_ID=com.tavia.web
APPLE_CLIENT_SECRET=eyJhbGciOiJFUzI1NiIs...
FACEBOOK_CLIENT_ID=123456789
FACEBOOK_CLIENT_SECRET=abcdef123456
```

### Mobile (`.env`)

```env
# API URL (your computer's local IP for physical devices)
EXPO_PUBLIC_API_URL=http://192.168.1.16:3000

# OAuth Providers (mobile-specific client IDs)
EXPO_PUBLIC_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
EXPO_PUBLIC_FACEBOOK_CLIENT_ID=123456789
# Note: Apple Sign In doesn't need credentials
```

## Deep Link Configuration (Mobile)

### Update app.json

```json
{
  "expo": {
    "scheme": "tavia",
    "ios": {
      "bundleIdentifier": "com.tavia.app",
      "usesAppleSignIn": true,
      "associatedDomains": ["applinks:tavia.io"]
    },
    "android": {
      "package": "com.tavia.app",
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "tavia",
              "host": "auth",
              "pathPrefix": "/callback"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

## Testing

### Web Apps (Backoffice/Frontoffice)

1. Start dev server: `pnpm dev:backoffice` or `pnpm dev:frontoffice`
2. Navigate to `/login`
3. Click "Continue with Google/Apple/Facebook"
4. Complete OAuth flow
5. Verify redirect to dashboard with session

### Mobile App

1. Start Metro: `cd apps/mobile && pnpm start`
2. Run on device: Press 'i' (iOS) or 'a' (Android)
3. Navigate to Login screen
4. Tap "Continue with Google/Apple/Facebook"
5. Complete OAuth flow
6. Verify redirect to main tabs with JWT token stored

## Troubleshooting

### "Redirect URI mismatch" error

- Verify OAuth redirect URIs match exactly (including protocol, port, path)
- Check for trailing slashes

### "Invalid client" error

- Verify Client ID and Client Secret are correct
- Check environment variables are loaded (restart server)

### Apple Sign In not working on iOS

- Ensure `usesAppleSignIn: true` in app.json
- Rebuild iOS app: `npx expo prebuild -p ios --clean`
- Check Apple Developer account is active

### Mobile OAuth not redirecting back

- Verify `scheme: "tavia"` in app.json
- Test deep link: `npx uri-scheme open tavia://auth/callback --ios`
- Check redirect URI in OAuth provider matches `tavia://auth/callback`

## Security Best Practices

1. **Never commit secrets** - Use `.env.local` for local credentials
2. **Rotate secrets regularly** - Especially after team changes
3. **Use different credentials** for dev/staging/prod
4. **Enable OAuth consent screen** review before launching
5. **Monitor OAuth usage** in provider dashboards
6. **Implement rate limiting** on OAuth endpoints

## Production Checklist

- [ ] Replace localhost URLs with production domains
- [ ] Update OAuth redirect URIs in all providers
- [ ] Set `NEXTAUTH_URL` to production URLs
- [ ] Move Apple app from development to production
- [ ] Submit Facebook app for review (public access)
- [ ] Test OAuth flows on production URLs
- [ ] Set up monitoring for OAuth errors
- [ ] Document OAuth credentials in password manager

## Resources

- [Auth.js OAuth Documentation](https://authjs.dev/getting-started/providers/oauth)
- [Expo AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign In Guide](https://developer.apple.com/sign-in-with-apple/)
- [Facebook Login Guide](https://developers.facebook.com/docs/facebook-login/)
