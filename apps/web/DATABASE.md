# Database & Authentication Setup

This guide covers setting up Prisma database and Auth.js authentication for
Tavia.

## Prerequisites

- **Docker** (recommended) - for local PostgreSQL container
- OR PostgreSQL installed locally / cloud database (Railway, Supabase, Neon,
  etc.)
- Node.js 18.18.0+ (see `.nvmrc`)
- pnpm v10.17.1

## Quick Start (Docker - Recommended)

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up environment variables:** Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   The default values work with Docker (no changes needed):

   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tavia?schema=public"
   ```

3. **Start PostgreSQL container:**

   ```bash
   pnpm docker:up
   ```

4. **Run database migrations:**

   ```bash
   pnpm db:migrate
   ```

5. **Seed the database:**
   ```bash
   pnpm db:seed
   ```

**Or run everything at once:**

```bash
pnpm db:setup
```

See [DOCKER.md](./DOCKER.md) for detailed Docker setup and troubleshooting.

## Alternative: Manual PostgreSQL Setup

If you prefer not to use Docker:

1. **Install PostgreSQL locally** or use a cloud provider

2. **Create a database:**

   ```sql
   CREATE DATABASE tavia;
   ```

3. **Update `.env.local`** with your connection string:

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/tavia?schema=public"
   ```

4. **Run migrations and seed:**
   ```bash
   pnpm db:migrate
   pnpm db:seed
   ```

## Environment Variables

### Required

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Random string (min 32 characters)

### OAuth Providers (Optional)

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL:
   `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Client Secret to `.env.local`

## Database Commands

```bash
# Generate Prisma Client (run after schema changes)
pnpm db:generate

# Push schema to database (dev only)
pnpm db:push

# Create and apply migrations (recommended for production)
pnpm db:migrate

# Deploy migrations (production)
pnpm db:migrate:deploy

# Seed the database with sample data
pnpm db:seed

# Open Prisma Studio (GUI for database)
pnpm db:studio
```

## Database Schema

### User Management

- **User** - User accounts with email/password or OAuth
- **Account** - OAuth account connections
- **Session** - User sessions
- **VerificationToken** - Email verification tokens

### Restaurant & Booking

- **Restaurant** - Restaurant listings with details
- **Table** - Restaurant tables with capacity
- **Booking** - User bookings for restaurant tables

### Enums

- **UserRole**: `USER`, `ADMIN`, `RESTAURANT_OWNER`
- **BookingStatus**: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`

## Authentication

### Credentials (Email/Password)

Users can sign up with email and password. Passwords are hashed with bcrypt.

### OAuth Providers

- Google OAuth
- GitHub OAuth

### Protected Routes

Use the `auth()` helper in Server Components:

```typescript
import { auth } from '@/lib/auth';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return <div>Welcome {session.user.name}</div>;
}
```

### Sign In/Out Actions

```typescript
import { signIn, signOut } from '@/lib/auth';

// Sign in with credentials
await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirectTo: '/dashboard',
});

// Sign in with OAuth
await signIn('google', { redirectTo: '/dashboard' });

// Sign out
await signOut({ redirectTo: '/' });
```

## Sample Data

The seed script creates:

- 1 admin user (email: `admin@tavia.com`, password: `admin123`)
- 2 sample restaurants (The Cozy Café, Italian Bistro)
- 6 tables across both restaurants
- 1 sample booking

## Database Providers

### Local PostgreSQL

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tavia_dev?schema=public"
```

### Railway

1. Create account at [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Copy DATABASE_URL from settings

### Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database

### Neon

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string

## Troubleshooting

### "Can't reach database server"

- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- For cloud databases, check IP whitelist settings

### "Error: P1001: Can't reach database"

- Verify connection string format
- Check network connectivity
- Ensure database exists

### Prisma Client errors after schema changes

```bash
pnpm db:generate
```

### Reset database

```bash
# Warning: This will delete all data
pnpm db:push --force-reset
pnpm db:seed
```

## Security Best Practices

1. **Never commit `.env.local`** - Already in .gitignore
2. **Use strong NEXTAUTH_SECRET** - Generate with:
   ```bash
   openssl rand -base64 32
   ```
3. **Use environment-specific databases** - Don't use production DB for dev
4. **Rotate secrets regularly** - Especially for production
5. **Limit database permissions** - Use read-only users where possible

## Next Steps

1. Set up your environment variables
2. Run database migrations
3. Seed sample data
4. Configure OAuth providers (optional)
5. Start developing!

```bash
pnpm dev
```

Visit http://localhost:3000 and start building! 🚀
