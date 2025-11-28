# OAuth Quick Start - Get Your Credentials in 15 Minutes

**TL;DR**: This guide gets you OAuth credentials fast. For detailed info, see
`OAUTH_SETUP.md`.

---

## 🟢 Google OAuth (Easiest - 5 minutes)

### Step 1: Go to Google Cloud Console

**URL**: https://console.cloud.google.com/

### Step 2: Create a Project

1. Click **"Select a project"** dropdown (top-left)
2. Click **"NEW PROJECT"**
3. **Project name**: `Tavia`
4. Click **"CREATE"**
5. Wait 10 seconds, then select your new project

### Step 3: Configure OAuth Consent Screen

1. Left sidebar → **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** → Click **"CREATE"**
3. Fill in:
   - **App name**: `Tavia`
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Click **"SAVE AND CONTINUE"**
5. **Scopes page**: Click **"ADD OR REMOVE SCOPES"**
   - Search and select: `email` and `profile`
   - Click **"UPDATE"** → **"SAVE AND CONTINUE"**
6. **Test users page**: Click **"SAVE AND CONTINUE"** (skip for now)
7. Click **"BACK TO DASHBOARD"**

### Step 4: Create Web Credentials (for Backoffice & Frontoffice)

1. Left sidebar → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client ID"**
3. **Application type**: `Web application`
4. **Name**: `Tavia Backoffice`
5. **Authorized redirect URIs** → Click **"+ ADD URI"**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   (Add production URL later: `https://admin.tavia.io/api/auth/callback/google`)
6. Click **"CREATE"**
7. **COPY THESE NOW**:
   - ✅ **Client ID**: `123456789-abc.apps.googleusercontent.com`
   - ✅ **Client Secret**: `GOCSPX-abc123xyz`
8. Click **"OK"**

### Step 5: Create Another Web Credential (for Frontoffice)

1. Click **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client ID"** again
2. **Application type**: `Web application`
3. **Name**: `Tavia Frontoffice`
4. **Authorized redirect URIs**:
   ```
   http://localhost:3003/api/auth/callback/google
   ```
5. Click **"CREATE"** → **COPY** Client ID and Secret

### Step 6: (Optional) Create Mobile Credentials

**For iOS**:

1. **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client ID"**
2. **Application type**: `iOS`
3. **Name**: `Tavia Mobile iOS`
4. **Bundle ID**: `com.tavia.app`
5. Click **"CREATE"** → **COPY** Client ID

**For Android**:

1. **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client ID"**
2. **Application type**: `Android`
3. **Name**: `Tavia Mobile Android`
4. **Package name**: `com.tavia.app`
5. **SHA-1 certificate fingerprint**: Get from Expo:
   ```bash
   # Development
   npx expo credentials:manager -p android
   # Or use: openssl rand -base64 32
   ```
6. Click **"CREATE"** → **COPY** Client ID

### Step 7: Add to Your `.env` Files

**apps/backoffice/.env**:

```env
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz
```

**apps/frontoffice/.env**:

```env
# Use the SAME credentials as backoffice OR create separate ones
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz
```

**apps/mobile/.env**:

```env
# Use the iOS Client ID (NOT the web one!)
EXPO_PUBLIC_GOOGLE_CLIENT_ID=123456789-ios.apps.googleusercontent.com
```

### ✅ Test Google OAuth

```bash
pnpm dev:backoffice
# Go to http://localhost:3000/login
# Click "Continue with Google" - should work!
```

---

## 🍎 Apple Sign In (Medium - 10 minutes, needs $99/year Apple Developer)

### Prerequisites

⚠️ **You need an Apple Developer account ($99/year)**:
https://developer.apple.com/programs/

### Step 1: Create an App ID

1. Go to: https://developer.apple.com/account/resources/identifiers/list
2. Click **"+"** (Add button)
3. Select **"App IDs"** → Click **"Continue"**
4. Select **"App"** → Click **"Continue"**
5. Fill in:
   - **Description**: `Tavia App`
   - **Bundle ID**: Select **"Explicit"** → `com.tavia.app`
   - **Capabilities**: Check ✅ **"Sign in with Apple"**
6. Click **"Continue"** → **"Register"**

### Step 2: Create a Services ID (for Web Apps)

1. Click **"+"** again
2. Select **"Services IDs"** → Click **"Continue"**
3. Fill in:
   - **Description**: `Tavia Web Auth`
   - **Identifier**: `com.tavia.web`
4. Check ✅ **"Sign in with Apple"**
5. Click **"Configure"** button next to it:
   - **Primary App ID**: Select `Tavia App (com.tavia.app)`
   - **Domains and Subdomains**:
     ```
     localhost
     ```
     (Add production later: `admin.tavia.io`, `tavia.io`)
   - **Return URLs**: Click **"+"** and add:
     ```
     http://localhost:3000/api/auth/callback/apple
     http://localhost:3003/api/auth/callback/apple
     ```
6. Click **"Save"** → **"Continue"** → **"Register"**

### Step 3: Create a Key (for Client Secret)

1. Go to: https://developer.apple.com/account/resources/authkeys/list
2. Click **"+"** (Add button)
3. **Key Name**: `Tavia Apple Auth Key`
4. Check ✅ **"Sign in with Apple"**
5. Click **"Configure"** next to it:
   - **Primary App ID**: Select `Tavia App`
6. Click **"Save"** → **"Continue"** → **"Register"**
7. Click **"Download"** - saves as `AuthKey_XXXXXXXXXX.p8`
8. **SAVE THIS FILE SECURELY** - you can only download it once!
9. **COPY THESE**:
   - ✅ **Key ID**: `XXXXXXXXXX` (shown on screen)
   - ✅ **Team ID**: `YYYYYYYYYY` (top-right of page)

### Step 4: Generate Client Secret (JWT Token)

Create a file `generate-apple-secret.js`:

```javascript
const jwt = require('jsonwebtoken');
const fs = require('fs');

// READ YOUR .p8 FILE
const privateKey = fs.readFileSync('AuthKey_XXXXXXXXXX.p8', 'utf8');

const token = jwt.sign(
  {
    iss: 'YYYYYYYYYY', // YOUR TEAM ID
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 15777000, // 6 months
    aud: 'https://appleid.apple.com',
    sub: 'com.tavia.web', // YOUR SERVICE ID
  },
  privateKey,
  {
    algorithm: 'ES256',
    header: {
      alg: 'ES256',
      kid: 'XXXXXXXXXX', // YOUR KEY ID
    },
  }
);

console.log('APPLE_CLIENT_SECRET:', token);
```

Run it:

```bash
npm install jsonwebtoken
node generate-apple-secret.js
```

**COPY THE OUTPUT** - this is your `APPLE_CLIENT_SECRET`

### Step 5: Add to Your `.env` Files

**apps/backoffice/.env**:

```env
APPLE_CLIENT_ID=com.tavia.web
APPLE_CLIENT_SECRET=eyJhbGciOiJFUzI1NiIsImtpZCI6IlhYWFhYWFhYWFgifQ.eyJpc3MiOiJZWVlZWVlZWVlZSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzE1Nzc3MDAwLCJhdWQiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwic3ViIjoiY29tLnRhdmlhLndlYiJ9.abcdefghijklmnopqrstuvwxyz
```

**apps/frontoffice/.env**:

```env
# Same as backoffice
APPLE_CLIENT_ID=com.tavia.web
APPLE_CLIENT_SECRET=eyJhbGci...
```

**Mobile**: ✅ **No credentials needed!** Apple Sign In works automatically on
iOS with `expo-apple-authentication`.

### ✅ Test Apple Sign In

```bash
pnpm dev:backoffice
# Go to http://localhost:3000/login
# Click "Continue with Apple" - should work!
```

**Note**: You'll need to regenerate the JWT secret every 6 months (or set longer
expiry).

---

## 🔵 Facebook Login (Easy - 5 minutes)

### Step 1: Create a Facebook App

1. Go to: https://developers.facebook.com/apps/
2. Click **"Create App"**
3. **Use case**: Select **"Other"** → Click **"Next"**
4. **App type**: Select **"Consumer"** → Click **"Next"**
5. Fill in:
   - **App name**: `Tavia`
   - **App contact email**: Your email
6. Click **"Create app"**

### Step 2: Add Facebook Login Product

1. In your app dashboard, find **"Add products to your app"**
2. Find **"Facebook Login"** → Click **"Set up"**
3. Choose **"Web"** (even though we'll use it for mobile too)
4. Skip the quickstart (click **"Settings"** in left sidebar under Facebook
   Login)

### Step 3: Configure Facebook Login Settings

1. Left sidebar → **"Facebook Login"** → **"Settings"**
2. **Valid OAuth Redirect URIs**: Add these (one per line):
   ```
   http://localhost:3000/api/auth/callback/facebook
   http://localhost:3003/api/auth/callback/facebook
   ```
3. Click **"Save Changes"**

### Step 4: Get Your Credentials

1. Left sidebar → **"Settings"** → **"Basic"**
2. **COPY THESE**:
   - ✅ **App ID**: `123456789012345`
   - ✅ **App Secret**: Click **"Show"** → Confirm password →
     `abc123def456xyz789`

### Step 5: Make App Public (Important!)

1. Top-right: Switch from **"Development"** to **"Live"**
2. You might need to complete **"App Review"** first:
   - Add **Privacy Policy URL**: `https://tavia.io/privacy` (can be placeholder
     for dev)
   - Add **App Icon**: Upload any 1024x1024 image
   - Select **Category**: `Business`
3. Toggle to **"Live"** mode

### Step 6: Add to Your `.env` Files

**apps/backoffice/.env**:

```env
FACEBOOK_CLIENT_ID=123456789012345
FACEBOOK_CLIENT_SECRET=abc123def456xyz789
```

**apps/frontoffice/.env**:

```env
# Same credentials
FACEBOOK_CLIENT_ID=123456789012345
FACEBOOK_CLIENT_SECRET=abc123def456xyz789
```

**apps/mobile/.env**:

```env
EXPO_PUBLIC_FACEBOOK_CLIENT_ID=123456789012345
```

### Step 7: Update Mobile `app.json`

```json
{
  "expo": {
    "facebookScheme": "fb123456789012345",
    "facebookAppId": "123456789012345",
    "facebookDisplayName": "Tavia"
  }
}
```

### ✅ Test Facebook Login

```bash
pnpm dev:backoffice
# Go to http://localhost:3000/login
# Click "Continue with Facebook" - should work!
```

---

## 📋 Complete `.env` Example

After getting all credentials, your files should look like:

**apps/backoffice/.env**:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tavia

# NextAuth
NEXTAUTH_SECRET=your_32_char_secret_here_use_openssl_rand
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz

# Apple Sign In
APPLE_CLIENT_ID=com.tavia.web
APPLE_CLIENT_SECRET=eyJhbGciOiJFUzI1NiIsImtpZCI6...

# Facebook Login
FACEBOOK_CLIENT_ID=123456789012345
FACEBOOK_CLIENT_SECRET=abc123def456xyz789
```

**apps/frontoffice/.env**:

```env
# Same as backoffice (shared database)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tavia
NEXTAUTH_SECRET=your_32_char_secret_here_use_openssl_rand
NEXTAUTH_URL=http://localhost:3003

# Same OAuth credentials
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz
APPLE_CLIENT_ID=com.tavia.web
APPLE_CLIENT_SECRET=eyJhbGciOiJFUzI1NiIsImtpZCI6...
FACEBOOK_CLIENT_ID=123456789012345
FACEBOOK_CLIENT_SECRET=abc123def456xyz789
```

**apps/mobile/.env**:

```env
# API URL (use your local IP for physical devices)
EXPO_PUBLIC_API_URL=http://192.168.1.16:3000

# Mobile OAuth (different Client IDs!)
EXPO_PUBLIC_GOOGLE_CLIENT_ID=123456789-ios.apps.googleusercontent.com
EXPO_PUBLIC_FACEBOOK_CLIENT_ID=123456789012345
# No Apple credentials needed - works automatically on iOS
```

---

## 🧪 Testing Your Setup

### 1. Start the Apps

```bash
# Terminal 1: Backoffice
pnpm dev:backoffice

# Terminal 2: Frontoffice
pnpm dev:frontoffice

# Terminal 3: Mobile
cd apps/mobile
pnpm start
```

### 2. Test Each OAuth Provider

**Backoffice** (http://localhost:3000/login):

- Click "Continue with Google" → Should redirect → Login → Return to dashboard
  ✅
- Click "Continue with Apple" → Should redirect → Login → Return to dashboard ✅
- Click "Continue with Facebook" → Should redirect → Login → Return to dashboard
  ✅

**Frontoffice** (http://localhost:3003/login):

- Same tests as above ✅

**Mobile**:

- Open app → Login screen
- Tap "Continue with Google" → Browser opens → Login → Returns to app ✅
- Tap "Continue with Apple" (iOS only) → Native dialog → Face ID → Returns to
  app ✅
- Tap "Continue with Facebook" → Browser opens → Login → Returns to app ✅

---

## 🐛 Common Issues

### "Redirect URI mismatch" (Google)

**Problem**: URL in error message doesn't match your configured URI

**Fix**:

1. Copy the exact URL from error message
2. Go to Google Cloud Console → Credentials → Edit your OAuth client
3. Add that exact URL to "Authorized redirect URIs"
4. Wait 5 minutes for changes to propagate

### "Invalid client" (All providers)

**Problem**: Client ID or Secret is wrong

**Fix**:

1. Double-check you copied the credentials correctly (no extra spaces!)
2. Restart your dev server: `Ctrl+C` then `pnpm dev:backoffice` again
3. Clear browser cookies and try again

### Apple Sign In not working on web

**Problem**: 404 or "Service not configured"

**Fix**:

1. Verify your JWT secret is not expired (check `exp` timestamp)
2. Regenerate JWT if needed (run `generate-apple-secret.js` again)
3. Verify Service ID domains include `localhost`
4. Verify Return URLs match exactly:
   `http://localhost:3000/api/auth/callback/apple`

### Mobile OAuth opens browser but never returns

**Problem**: Deep link not working

**Fix**:

1. Verify `scheme: "tavia"` in `app.json`
2. Test deep link manually:
   ```bash
   npx uri-scheme open tavia://auth/callback --ios
   ```
3. For Android: Rebuild app with `npx expo prebuild -p android --clean`
4. Verify redirect URI in OAuth provider is exactly `tavia://auth/callback`

### Facebook "App Not Setup" error

**Problem**: App is still in Development mode

**Fix**:

1. Go to Facebook Developers → Your App → Settings → Basic
2. Add Privacy Policy URL (can be placeholder)
3. Add App Icon (any 1024x1024 image)
4. Switch to "Live" mode (top-right toggle)

---

## 🎯 Quick Reference

| Provider     | Console URL                         | What You Need                                  | Time   |
| ------------ | ----------------------------------- | ---------------------------------------------- | ------ |
| **Google**   | https://console.cloud.google.com    | Client ID + Secret (web)<br>Client ID (mobile) | 5 min  |
| **Apple**    | https://developer.apple.com/account | Service ID + JWT Secret<br>($99/year account)  | 10 min |
| **Facebook** | https://developers.facebook.com     | App ID + App Secret                            | 5 min  |

---

## 📚 Next Steps

1. ✅ Get credentials from all 3 providers (follow this guide)
2. ✅ Add to `.env` files (see examples above)
3. ✅ Test OAuth on web apps (backoffice + frontoffice)
4. ✅ Test OAuth on mobile (iOS + Android)
5. ✅ Update redirect URIs for production domains when deploying

**Need more details?** See `OAUTH_SETUP.md` for comprehensive documentation.

**Still stuck?** Common issues section above should help! 🚀
