# @tavia/logger

Centralized logging system for Tavia frontend applications.

## Features

- 🎯 Multiple log levels (debug, info, warn, error)
- 🔍 Contextual logging with metadata
- 🌍 Environment-aware (dev vs production)
- 🎨 Colored console output (dev only)
- 📊 Structured logging for analytics integration
- ⚡ Performance timing utilities
- 🔒 Sensitive data filtering
- 📱 React hooks for component logging

## Installation

```bash
pnpm add @tavia/logger
```

## Usage

### Basic Logging

```typescript
import { logger } from '@tavia/logger';

logger.info('User logged in', { userId: '123' });
logger.error('Failed to fetch data', { error });
logger.debug('Debug info', { data });
logger.warn('Deprecated API used');
```

### Create Namespaced Logger

```typescript
import { createLogger } from '@tavia/logger';

const eventLogger = createLogger('events');
eventLogger.info('Event created', { eventId: '456' });
// Output: [events] Event created { eventId: '456' }
```

### React Hook

```typescript
import { useLogger } from '@tavia/logger';

function MyComponent() {
  const logger = useLogger('MyComponent');

  useEffect(() => {
    logger.info('Component mounted');
  }, []);

  return <div>...</div>;
}
```

### Performance Timing

```typescript
import { createTimer } from '@tavia/logger';

const timer = createTimer('api-call');
await fetchData();
timer.end(); // Logs: ⏱️ api-call completed in 234ms
```

### Error Logging with Context

```typescript
import { logError } from '@tavia/logger';

try {
  await riskyOperation();
} catch (error) {
  logError(error, {
    context: 'UserProfile',
    userId: user.id,
    action: 'updateProfile',
  });
}
```

## Configuration

```typescript
import { configureLogger } from '@tavia/logger';

configureLogger({
  level: 'debug', // 'debug' | 'info' | 'warn' | 'error'
  enabled: true,
  enableColors: true, // Colored output in dev
  enableTimestamps: true,
  sensitiveKeys: ['password', 'token', 'secret'], // Auto-filter these keys
});
```

## API Reference

### Logger Methods

- `logger.debug(message, metadata?)` - Debug-level logging
- `logger.info(message, metadata?)` - Info-level logging
- `logger.warn(message, metadata?)` - Warning-level logging
- `logger.error(message, metadata?)` - Error-level logging

### Utilities

- `createLogger(namespace)` - Create namespaced logger
- `createTimer(label)` - Create performance timer
- `logError(error, context)` - Log error with context
- `configureLogger(config)` - Configure global logger settings

### React Hooks

- `useLogger(componentName)` - Get logger for component
- `usePerformanceLogger()` - Track component render performance

## License

MIT
