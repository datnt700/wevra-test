# Docker PostgreSQL Setup

This directory contains Docker configuration for running PostgreSQL locally for
development.

## Quick Start

### 1. Start PostgreSQL Container

```bash
# Start PostgreSQL in the background
pnpm docker:up

# Or using docker-compose directly
docker-compose up -d
```

The database will be available at `localhost:5432` with the following
credentials:

- **User:** `postgres`
- **Password:** `postgres`
- **Database:** `tavia`

### 2. Run Database Migrations

```bash
# Run Prisma migrations
pnpm db:migrate

# Or run the full setup (starts Docker + migrates + seeds)
pnpm db:setup
```

### 3. Verify Connection

```bash
# Check if container is running
docker ps

# View PostgreSQL logs
pnpm docker:logs

# Or
docker-compose logs -f postgres
```

## Available Scripts

| Script                | Description                                         |
| --------------------- | --------------------------------------------------- |
| `pnpm docker:up`      | Start PostgreSQL container in background            |
| `pnpm docker:down`    | Stop PostgreSQL container                           |
| `pnpm docker:logs`    | View PostgreSQL logs (follow mode)                  |
| `pnpm docker:restart` | Restart PostgreSQL container                        |
| `pnpm docker:clean`   | Stop container and remove volumes (⚠️ deletes data) |
| `pnpm db:setup`       | Complete setup: Start Docker + Migrate + Seed       |
| `pnpm db:migrate`     | Run Prisma migrations                               |
| `pnpm db:seed`        | Seed database with sample data                      |
| `pnpm db:studio`      | Open Prisma Studio GUI                              |

## Environment Variables

The following environment variables are used (defined in `.env.local`):

```bash
# Database connection string
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tavia?schema=public"

# Docker container settings
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=tavia
```

## Docker Compose Configuration

The `docker-compose.yml` file defines:

- **Image:** PostgreSQL 16 Alpine (lightweight)
- **Port:** 5432 (mapped to host)
- **Volume:** Persistent data storage (`postgres_data`)
- **Health Check:** Automatic readiness checks
- **Init Script:** `init-db.sql` runs on first startup

## Troubleshooting

### Port Already in Use

If port 5432 is already in use, either:

1. Stop the existing PostgreSQL service:

   ```bash
   # Windows (PowerShell as Administrator)
   Stop-Service postgresql-x64-16
   ```

2. Or change the port in `docker-compose.yml`:
   ```yaml
   ports:
     - '5433:5432' # Use port 5433 on host
   ```
   And update `DATABASE_URL` in `.env.local`:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5433/tavia?schema=public"
   ```

### Container Won't Start

```bash
# Check container logs
docker-compose logs postgres

# Remove and recreate container
pnpm docker:clean
pnpm docker:up
```

### Connection Refused

1. Ensure container is running:

   ```bash
   docker ps
   ```

2. Wait for health check to pass:

   ```bash
   docker-compose ps
   ```

   Status should show "healthy"

3. Test connection:
   ```bash
   # Using psql (if installed)
   psql -h localhost -U postgres -d tavia
   ```

### Reset Database

⚠️ **This will delete all data!**

```bash
# Stop container and remove volumes
pnpm docker:clean

# Start fresh
pnpm docker:up
pnpm db:migrate
pnpm db:seed
```

## Data Persistence

Database data is stored in a Docker volume named `postgres_data`. This data
persists even when the container is stopped or removed (unless you use
`docker:clean`).

To backup/restore:

```bash
# Backup
docker exec tavia-postgres pg_dump -U postgres tavia > backup.sql

# Restore
docker exec -i tavia-postgres psql -U postgres tavia < backup.sql
```

## Production

**DO NOT use this Docker setup in production!**

For production:

- Use a managed database service (AWS RDS, Supabase, Railway, etc.)
- Or configure proper PostgreSQL deployment with security hardening
- Update `DATABASE_URL` in production environment variables
