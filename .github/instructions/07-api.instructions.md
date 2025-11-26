---
applyTo: 'apps/{analytics,event-service}/**/*.ts,apps/backoffice/src/app/api/**/*.ts'
---

# API Patterns

## Standardized Error Handling (Backoffice)

**Location:** `apps/backoffice/src/lib/api/`

- `errors.ts` - Custom error classes
- `response.ts` - Response builders
- `handler.ts` - withApiHandler wrapper

## Standard Response Format

```typescript
// Success
{
  "success": true,
  "data": { /* endpoint data */ },
  "meta": {  // Optional - for pagination
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}

// Error
{
  "success": false,
  "error": {
    "message": "Human-readable error",
    "code": "ERROR_CODE",
    "details": { /* optional */ }
  }
}
```

## Response Builders

```typescript
import { apiSuccess, apiError, ApiErrors } from '@/lib/api/response';

// Success
return apiSuccess({ token, user });

// Generic error
return apiError('Invalid credentials', 401, 'UNAUTHORIZED');

// Pre-built errors
return ApiErrors.unauthorized(); // 401
return ApiErrors.forbidden(); // 403
return ApiErrors.notFound('Event'); // 404
return ApiErrors.badRequest('Validation error', details); // 400
return ApiErrors.conflict('Email exists'); // 409
return ApiErrors.planLimitReached('Limit exceeded', { needsUpgrade: true }); // 403
return ApiErrors.internalError(); // 500
```

## Error Classes

```typescript
import {
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
  BadRequestError,
  PlanLimitError
} from '@/lib/api/errors';

// Throw errors (caught by error handler)
if (!user) throw new UnauthorizedError('Invalid email or password');
if (user.role !== 'ATTENDEE') throw new ForbiddenError('Access denied');
if (existingUser) throw new ConflictError('User already exists');
if (!event) throw new NotFoundError('Event');

// In catch block
catch (error) {
  if (error instanceof UnauthorizedError) {
    return apiError(error.message, error.statusCode, error.code);
  }
  if (error instanceof z.ZodError) {
    const details = error.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));
    return ApiErrors.badRequest('Validation error', details);
  }
  return ApiErrors.internalError();
}
```

## withApiHandler Wrapper

```typescript
import { withApiHandler } from '@/lib/api/handler';

export const GET = withApiHandler<EventResponse>(
  async (request, { session, params }) => {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });
    return apiSuccess(event);
  },
  {
    requireAuth: true,
    allowedRoles: ['ADMIN', 'ORGANIZER'],
  }
);
```

## CORS Configuration (Mobile API)

**Location:** `apps/backoffice/src/middleware.ts`

```typescript
export function middleware(request: NextRequest) {
  if (pathname.startsWith('/api/mobile')) {
    // Preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin': '*');
  }
}
```

**Production:** Replace `'*'` with specific origins

## Critical Rules

1. ✅ Always use `apiSuccess()` for successful responses
2. ✅ Always use `ApiErrors.*` or `apiError()` for errors
3. ✅ Throw custom error classes - caught automatically
4. ✅ Handle Zod validation errors with field details
5. ✅ Use `withApiHandler` for routes needing auth/role checks
6. ❌ Never return raw `NextResponse.json()` - breaks standardization
7. ❌ Never hardcode error messages - use error classes
