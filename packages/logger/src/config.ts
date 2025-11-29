import type { LoggerConfig, LogLevel } from './types';

/**
 * Default logger configuration
 */
const defaultConfig: Required<LoggerConfig> = {
  level: 'info',
  enabled: process.env.NODE_ENV !== 'production',
  enableColors: process.env.NODE_ENV === 'development',
  enableTimestamps: true,
  sensitiveKeys: ['password', 'token', 'secret', 'apiKey', 'accessToken', 'refreshToken'],
  formatter: (level, message, metadata) => {
    const timestamp = new Date().toISOString();
    const metaStr = metadata ? ` ${JSON.stringify(metadata)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
  },
  onLog: () => {}, // No-op by default
};

/**
 * Current configuration (mutable)
 */
let currentConfig: Required<LoggerConfig> = { ...defaultConfig };

/**
 * Log level priorities for filtering
 */
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Get current configuration
 */
export function getConfig(): Required<LoggerConfig> {
  return currentConfig;
}

/**
 * Update configuration
 */
export function setConfig(config: Partial<LoggerConfig>): void {
  currentConfig = { ...currentConfig, ...config };
}

/**
 * Reset to default configuration
 */
export function resetConfig(): void {
  currentConfig = { ...defaultConfig };
}

/**
 * Check if a log level should be logged based on current config
 */
export function shouldLog(level: LogLevel): boolean {
  if (!currentConfig.enabled) return false;
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentConfig.level];
}

/**
 * Filter sensitive data from metadata
 */
export function filterSensitiveData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> | undefined {
  if (!metadata) return undefined;

  const filtered = { ...metadata };
  const sensitiveKeys = currentConfig.sensitiveKeys;

  for (const key of sensitiveKeys) {
    if (key in filtered) {
      filtered[key] = '[REDACTED]';
    }
  }

  return filtered;
}
