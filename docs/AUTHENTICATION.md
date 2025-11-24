# Tavia Authentication Flow

This document describes the complete authentication flow for the Tavia platform,
covering both web (backoffice/frontoffice) and mobile applications.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│                      (Port: 5432)                           │
│                   Shared by all apps                        │
└────────────┬───────────────────────────────┬────────────────┘
             │                               │
    ┌────────▼──────────┐          ┌────────▼─────────────┐
    │   Backoffice      │          │   Frontoffice        │
    │   (Port 3000)     │          │   (Port 3003)        │
    │                   │          │                      │
    │ • Auth.js (OAuth) │          │ • Server Actions     │
    │ • Session-based   │          │ • JWT Auth           │
    │ • ORGANIZER       │          │ • ATTENDEE           │
    │ • ADMIN           │          │ • Event Discovery    │
    │ • MODERATOR       │          │                      │
    └───────────────────┘          └──────────────────────┘
                                            │
                                   ┌────────▼─────────────┐
                                   │  Mobile App          │
                                   │  (Expo/React Native) │
                                   │                      │
                                   │ • JWT Tokens         │
                                   │ • ATTENDEE Only      │
                                   │ • Event Discovery    │
                                   │ • expo-secure-store  │
                                   └──────────────────────┘
```

---

## User Roles & Access

### Role Definitions

| Role          | Access               | Description                                                 |
| ------------- | -------------------- | ----------------------------------------------------------- |
| **ADMIN**     | Backoffice only      | Full system access, user management, subscription oversight |
| **ORGANIZER** | Backoffice only      | Create/manage groups and events (Free or Premium plans)     |
| **MODERATOR** | Backoffice only      | Assist organizers with group management (Premium feature)   |
| **ATTENDEE**  | Frontoffice + Mobile | Discover and join events (unlimited, always free)           |

### Access Matrix

| Platform        | ADMIN | ORGANIZER | MODERATOR | ATTENDEE |
| --------------- | ----- | --------- | --------- | -------- |
| Backoffice Web  | ✅    | ✅        | ✅        | ❌       |
| Frontoffice Web | ❌    | ❌        | ❌        | ✅       |
| Mobile App      | ❌    | ❌        | ❌        | ✅       |

---

## 1. Backoffice Authentication (Web)

**Technology:** Auth.js (NextAuth v5) with session-based authentication

**Roles Allowed:** ADMIN, ORGANIZER, MODERATOR

### Authentication Methods

#### a) Credentials (Email/Password)

```typescript
POST /api/auth/callback/credentials
Content-Type: application/json

{
  "email": "organizer@example.com",
  "password": "SecurePass123"
}
```

**Flow:**

1. User submits email/password
2. Auth.js validates credentials against database
3. Password hashed with bcrypt (12 rounds)
4. JWT token generated and stored in HTTP-only cookie
5. Session created with user data (id, email, role, subscriptionStatus)

#### b) OAuth Providers (Google, Apple, Facebook)

```typescript
// Redirect to OAuth provider
GET / api / auth / signin / google;
GET / api / auth / signin / apple;
GET / api / auth / signin / facebook;
```

**Flow:**

1. User clicks OAuth button
2. Redirected to provider (Google/Apple/Facebook)
3. User authorizes app
4. Callback to `/api/auth/callback/[provider]`
5. User created/updated in database with ORGANIZER role
6. Session created

### Session Management

**JWT Token Stored in HTTP-only Cookie:**

```typescript
{
  id: "user_id",
  email: "user@example.com",
  role: "ORGANIZER",
  subscriptionStatus: "PREMIUM",
  iat: 1700000000,
  exp: 1702592000 // 30 days
}
```

**Session Verification:**

```typescript
// Server-side (Server Components)
import { auth } from '@/lib/auth';
const session = await auth();

// Client-side (Client Components)
import { useSession } from 'next-auth/react';
const { data: session } = useSession();
```

### Protected Routes

**Middleware** (`apps/backoffice/middleware.ts`):

- All routes under `/(backoffice)` require authentication
- Checks session validity
- Verifies user has ADMIN, ORGANIZER, or MODERATOR role
- Verifies PREMIUM or TRIAL subscription status

---

## 2. Frontoffice Authentication (Web)

**Technology:** Next.js Server Actions with JWT

**Roles Allowed:** ATTENDEE

### Authentication Endpoints

#### a) Login

```typescript
// Server Action
'use server';
export async function loginAction(email: string, password: string);
```

#### b) Register

```typescript
// Server Action
'use server';
export async function registerAction(
  name: string,
  email: string,
  password: string
);
```

**Flow:**

1. User submits credentials via form
2. Server action validates and queries database
3. JWT token generated and returned
4. Token stored in `localStorage` or `sessionStorage`
5. User data cached in React Context

---

## 3. Mobile Authentication (React Native)

**Technology:** JWT tokens with expo-secure-store

**Roles Allowed:** ATTENDEE only

### API Response Format

**All mobile API endpoints follow Tavia's standardized response format:**

#### Success Response

```typescript
{
  "success": true,
  "data": {
    // Endpoint-specific data
  },
  "meta": {  // Optional - for paginated responses
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### Error Response

```typescript
{
  "success": false,
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",  // e.g., UNAUTHORIZED, BAD_REQUEST
    "details": {  // Optional - additional context
      // Error-specific details (e.g., validation errors)
    }
  }
}
```

#### Standard Error Codes

- `UNAUTHORIZED` (401): Invalid or missing authentication
- `FORBIDDEN` (403): User lacks required permissions
- `BAD_REQUEST` (400): Invalid input or validation error
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource already exists (e.g., duplicate email)
- `PLAN_LIMIT_REACHED` (403): Subscription limit exceeded
- `INTERNAL_ERROR` (500): Server error

### API Endpoints

#### a) Register

```typescript
POST http://localhost:3000/api/mobile/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response 201 Created:
{
  "success": true,
  "data": {
    "message": "Registration successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "name": "John Doe",
      "image": null,
      "role": "ATTENDEE",
      "subscriptionStatus": "FREE"
    }
  }
}

Error Response (409 Conflict):
{
  "success": false,
  "error": {
    "message": "User with this email already exists",
    "code": "CONFLICT"
  }
}

Error Response (400 Bad Request - Validation):
{
  "success": false,
  "error": {
    "message": "Validation error",
    "code": "BAD_REQUEST",
    "details": [
      { "field": "password", "message": "Password must contain at least one uppercase letter" }
    ]
  }
}
```

**Validation Rules:**

- Name: min 2 characters
- Email: valid email format
- Password:
  - Min 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number

#### b) Login

```typescript
POST http://localhost:3000/api/mobile/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response 200 OK:
{
  "success": true,
  "data": {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "name": "John Doe",
      "image": null,
      "role": "ATTENDEE",
      "subscriptionStatus": "FREE"
    }
  }
}

Error Response (401 Unauthorized):
{
  "success": false,
  "error": {
    "message": "Invalid email or password",
    "code": "UNAUTHORIZED"
  }
}

Error Response (403 Forbidden - Wrong Role):
{
  "success": false,
  "error": {
    "message": "Access denied. This app is for attendees only. Use the web app to manage events.",
    "code": "FORBIDDEN"
  }
}

// Wrong role (not ATTENDEE)
403 Forbidden
{
  "message": "Access denied. This app is for attendees only. Use the web app to manage events."
}

// Validation error
400 Bad Request
{
  "message": "Validation error",
  "errors": [
    { "field": "password", "message": "Password must be at least 8 characters" }
  ]
}
```

#### c) Token Verification

```typescript
POST http://localhost:3000/api/mobile/verify
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response 200 OK:
{
  "success": true,
  "data": {
    "message": "Token valid",
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "name": "John Doe",
      "image": null,
      "role": "ATTENDEE",
      "subscriptionStatus": "FREE"
    }
  }
}

Error Response (401 Unauthorized):
{
  "success": false,
  "error": {
    "message": "Invalid or expired token",
    "code": "UNAUTHORIZED"
  }
}

Error Response (404 Not Found):
{
  "success": false,
  "error": {
    "message": "User not found.",
    "code": "NOT_FOUND"
  }
}
```

### Token Storage (Mobile)

```typescript
import * as SecureStore from 'expo-secure-store';

// Save token
await SecureStore.setItemAsync('userToken', token);

// Retrieve token
const token = await SecureStore.getItemAsync('userToken');

// Delete token (logout)
await SecureStore.deleteItemAsync('userToken');
```

### JWT Token Structure

```typescript
{
  userId: "user_id",
  email: "john@example.com",
  role: "ATTENDEE",
  subscriptionStatus: "FREE",
  iat: 1700000000,    // Issued at
  exp: 1702592000     // Expires in 30 days
}
```

**Secret:** Uses `NEXTAUTH_SECRET` or `JWT_SECRET` from environment variables

---

## 4. Implementation Details

### File Structure

```
apps/backoffice/
├── src/
│   ├── lib/
│   │   └── auth.ts                    # Auth.js configuration
│   ├── app/
│   │   └── api/
│   │       ├── auth/[...nextauth]/    # Auth.js routes
│   │       ├── iam/register/          # Admin user creation
│   │       └── mobile/                # Mobile API endpoints
│   │           ├── login/route.ts     # Mobile login
│   │           ├── register/route.ts  # Mobile registration
│   │           └── verify/route.ts    # Token verification
│   └── middleware.ts                  # Route protection

apps/frontoffice/
├── src/
│   ├── actions/
│   │   └── auth.actions.ts            # Server actions for auth
│   ├── lib/
│   │   └── prisma.ts                  # Prisma client
│   └── app/
│       └── (auth)/
│           ├── login/page.tsx         # Login UI
│           └── signup/page.tsx        # Signup UI

apps/mobile/
├── app/
│   └── (auth)/
│       ├── login.tsx                  # Login screen
│       └── signup.tsx                 # Signup screen
├── services/
│   └── auth.ts                        # API client
└── context/
    └── AuthContext.tsx                # Auth state management
```

### Environment Variables

```env
# Shared across apps
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tavia"

# Backoffice
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
APPLE_CLIENT_ID="your-apple-client-id"
APPLE_CLIENT_SECRET="your-apple-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"

# Mobile API (Optional - uses NEXTAUTH_SECRET as fallback)
JWT_SECRET="your-jwt-secret-key-min-32-chars"

# Mobile App
EXPO_PUBLIC_API_URL="http://localhost:3000"
```

---

## 5. Security Considerations

### Password Security

- **Hashing:** bcrypt with 12 salt rounds
- **Validation:**
  - Min 8 characters (mobile), 6 (web)
  - Complexity requirements for mobile (uppercase, lowercase, number)

### Token Security

- **JWT Expiry:** 30 days
- **Storage:**
  - Web: HTTP-only cookies (secure, sameSite: lax)
  - Mobile: expo-secure-store (encrypted, OS-level keychain)
- **Refresh:** No automatic refresh (re-login required after expiry)

### API Protection

- **Middleware:** Protects all backoffice routes
- **Server Actions:** Validate auth on every call
- **Mobile API:** Bearer token verification on protected endpoints

### Role Enforcement

- **Database Level:** Role column with enum constraint
- **Application Level:**
  - Backoffice: signIn callback checks role
  - Mobile: Login endpoint rejects non-ATTENDEE users
  - API: Each endpoint validates user role

---

## 6. User Flows

### New Organizer (Web - Backoffice)

1. Visit `http://localhost:3000/login`
2. Click "Continue with Google" (or email/password)
3. Complete OAuth flow
4. Assigned ORGANIZER role automatically
5. Redirected to dashboard
6. Limited to FREE plan (1 group, 50 members, 2 events/month)

### New Attendee (Mobile)

1. Open mobile app
2. Tap "Sign up"
3. Enter name, email, password
4. POST to `/api/mobile/register`
5. Receive JWT token
6. Token saved to expo-secure-store
7. Navigate to home screen
8. Unlimited access to discover and join events

### Existing User Login (Mobile)

1. Open mobile app
2. Tap "Sign in"
3. Enter email, password
4. POST to `/api/mobile/login`
5. Validate ATTENDEE role
6. Receive JWT token
7. Token saved to expo-secure-store
8. Navigate to home screen

---

## 7. Database Schema

```prisma
model User {
  id                   String             @id @default(cuid())
  name                 String?
  email                String             @unique
  emailVerified        DateTime?
  password             String?
  image                String?
  role                 UserRole           @default(ATTENDEE)
  subscriptionStatus   SubscriptionStatus @default(FREE)
  subscriptionEndDate  DateTime?
  stripeCustomerId     String?            @unique
  stripeSubscriptionId String?            @unique
  groupCount           Int                @default(0)
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt

  // Relations
  accounts         Account[]
  sessions         Session[]
  ownedGroups      Group[]
  groupMemberships GroupMember[]
  eventRSVPs       EventRSVP[]
  moderatedGroups  GroupModerator[]
  createdEvents    Event[]
}

enum UserRole {
  ADMIN
  ORGANIZER
  MODERATOR
  ATTENDEE
}

enum SubscriptionStatus {
  FREE
  PREMIUM
  TRIAL
  CANCELED
}
```

---

## 8. Next Steps

### Required Installations

```bash
# Backoffice
cd apps/backoffice
pnpm add jsonwebtoken @types/jsonwebtoken

# Mobile (already installed)
cd apps/mobile
# expo-secure-store comes with Expo SDK
```

### Mobile App Auth Implementation

Create auth service and context:

```typescript
// apps/mobile/services/auth.ts
import * as SecureStore from 'expo-secure-store';

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/mobile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    await SecureStore.setItemAsync('userToken', data.token);
    return data.user;
  },

  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/api/mobile/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    await SecureStore.setItemAsync('userToken', data.token);
    return data.user;
  },

  async logout() {
    await SecureStore.deleteItemAsync('userToken');
  },

  async getToken() {
    return await SecureStore.getItemAsync('userToken');
  },
};
```

---

## 9. Testing

### Manual Testing

**Backoffice (Web):**

```bash
cd apps/backoffice
pnpm dev  # http://localhost:3000
```

**Mobile API:**

```bash
# Register attendee
curl -X POST http://localhost:3000/api/mobile/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test1234"}'

# Login
curl -X POST http://localhost:3000/api/mobile/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'

# Verify token
curl -X POST http://localhost:3000/api/mobile/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 10. Troubleshooting

### Common Issues

**1. "Invalid or expired token"**

- Token expired (30 days max)
- Wrong JWT_SECRET in environment
- Token manually edited

**2. "Access denied. This app is for attendees only"**

- User has ORGANIZER/ADMIN/MODERATOR role
- Create new account with ATTENDEE role
- Or use web app for organizer features

**3. "Premium subscription required"**

- Free users trying to access backoffice
- Upgrade to Premium plan
- Or downgrade user to ATTENDEE role for mobile access

---

## Summary

- **Backoffice:** Session-based auth (Auth.js) for ORGANIZERS/ADMINS
- **Frontoffice:** Server actions for ATTENDEES
- **Mobile:** JWT tokens in secure storage for ATTENDEES
- **Shared Database:** All apps use same PostgreSQL instance
- **Role Separation:** Clear boundaries between organizer and attendee
  experiences
- **Security:** bcrypt passwords, HTTP-only cookies, encrypted token storage

**API Base URL:** `http://localhost:3000` (backoffice serves all APIs)
