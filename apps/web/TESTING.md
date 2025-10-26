# Testing Documentation

This document describes the test suites for the Tavia web application.

## Test Structure

### Unit Tests (`tests/`)

Unit tests are located in the `tests/` directory and use Vitest as the test
runner.

#### Authentication Tests (`tests/lib/auth.test.ts`)

Tests for authentication logic including:

- **User Authentication**
  - Valid credentials authentication
  - Invalid email handling
  - Invalid password handling
  - OAuth user without password rejection

- **Role-based Access Control**
  - ADMIN role access
  - RESTAURANT_OWNER role access
  - CUSTOMER role denial

- **Input Validation**
  - Email format validation
  - Password minimum length validation

#### Dashboard Tests (`tests/app/dashboard.test.tsx`)

Tests for dashboard components including:

- **Dashboard Content**
  - Welcome message with user name
  - Stats display
  - Empty state handling
  - Restaurant list rendering
  - Status badges
  - Quick actions section

### E2E Tests (`e2e/`)

End-to-end tests use Playwright for browser automation.

#### Authentication E2E (`e2e/auth.spec.ts`)

Tests for the complete authentication flow:

- **Login Page**
  - Page elements display
  - Form validation (empty form, invalid email, short password)
  - Invalid credentials error handling
  - Successful login flow
  - Remember me toggle
  - Forgot password link

- **Internationalization**
  - English (default)
  - Vietnamese

- **Protected Routes**
  - Redirect to login when unauthenticated
  - Dashboard access after login

#### Dashboard E2E (`e2e/dashboard.spec.ts`)

Tests for dashboard functionality:

- **Dashboard Page**
  - Page title and welcome message
  - Stats cards display
  - Quick actions section
  - Restaurant list
  - Sign out functionality

- **Restaurant Management**
  - Empty state
  - Restaurant cards display
  - Status badges
  - Navigation to restaurant management

- **Stats Display**
  - Numeric stats rendering
  - Stat icons

- **Internationalization**
  - English dashboard
  - Vietnamese dashboard

- **Responsive Design**
  - Mobile viewport (375x667)
  - Tablet viewport (768x1024)
  - Desktop viewport (1920x1080)

## Running Tests

### Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run E2E tests in UI mode
pnpm test:e2e:ui

# Run specific test file
pnpm test:e2e e2e/auth.spec.ts
```

## Internationalization (i18n)

All hardcoded strings have been moved to translation files:

- `src/messages/en.json` - English translations
- `src/messages/vi.json` - Vietnamese translations

### Translation Keys

#### Error Pages

- `errors.error.*` - Error page strings
- `errors.globalError.*` - Global error page strings
- `errors.notFoundPage.*` - 404 page strings
- `errors.loading.*` - Loading page strings

#### Dashboard

- `dashboard.welcome` - Welcome message
- `dashboard.stats.*` - Statistics labels
- `dashboard.quickActions.*` - Quick actions section
- `dashboard.restaurants.*` - Restaurant management section

#### Authentication

- `auth.login.*` - Login page strings
- `auth.login.errors.*` - Login error messages
- `auth.login.validation.*` - Login validation messages

## Test Data Requirements

For E2E tests to pass, you need:

1. **Test User**: Create a test user with credentials:
   - Email: `admin@example.com`
   - Password: `password123`
   - Role: `ADMIN` or `RESTAURANT_OWNER`

2. **Database**: Ensure the test database is seeded with appropriate data

3. **Environment**: Set up `.env.test` with test database connection

## Coverage Goals

- **Unit Tests**: > 80% coverage for business logic
- **E2E Tests**: Cover critical user flows (auth, dashboard, booking)
- **i18n**: All user-facing strings translated (English + Vietnamese)

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Reset state between tests
3. **Assertions**: Use descriptive expect messages
4. **Selectors**: Prefer accessible selectors (roles, labels) over CSS
5. **Mocking**: Mock external dependencies in unit tests
6. **Data**: Use test fixtures for consistent data

## CI/CD Integration

Tests run automatically on:

- Pull request creation
- Push to `main` or `develop` branches
- Pre-deployment validation

## Troubleshooting

### Common Issues

1. **Test timeouts**: Increase timeout in `playwright.config.ts`
2. **Database connection**: Check `.env.test` configuration
3. **Translation missing**: Add keys to both `en.json` and `vi.json`
4. **Flaky tests**: Add proper wait conditions (`waitForURL`,
   `waitForLoadState`)

## Future Improvements

- [ ] Add visual regression testing
- [ ] Implement API testing
- [ ] Add performance testing
- [ ] Increase coverage to 90%+
- [ ] Add more languages (French, Spanish)
