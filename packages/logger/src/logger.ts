import type { Logger, LogLevel, LogMetadata, LoggerConfig } from './types';
import { getConfig, setConfig, shouldLog, filterSensitiveData } from './config';

/**
 * Console color codes for different log levels
 */
const COLORS = {
  debug: '\x1b[36m', // Cyan
  info: '\x1b[32m', // Green
  warn: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
  reset: '\x1b[0m',
} as const;

/**
 * Console icons for different log levels
 */
const ICONS = {
  debug: '🔍',
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
} as const;

/**
 * Create a logger instance
 */
class LoggerImpl implements Logger {
  private namespace?: string;

  constructor(namespace?: string) {
    this.namespace = namespace;
  }

  private log(level: LogLevel, message: string, metadata?: LogMetadata): void {
    if (!shouldLog(level)) return;

    const config = getConfig();
    const filteredMetadata = filterSensitiveData(metadata);

    // Call external handler if configured
    if (config.onLog) {
      config.onLog(level, message, filteredMetadata);
    }

    // Format message
    const namespacePart = this.namespace ? `[${this.namespace}] ` : '';
    const icon = ICONS[level];
    const timestamp = config.enableTimestamps ? `[${new Date().toISOString()}] ` : '';

    let logMessage = `${timestamp}${icon} ${namespacePart}${message}`;

    // Apply colors in development
    if (config.enableColors && typeof window !== 'undefined') {
      logMessage = `${COLORS[level]}${logMessage}${COLORS.reset}`;
    }

    // Console method
    const consoleMethod = level === 'debug' ? 'log' : level;

    // Log to console
    if (filteredMetadata && Object.keys(filteredMetadata).length > 0) {
      console[consoleMethod](logMessage, filteredMetadata);
    } else {
      console[consoleMethod](logMessage);
    }
  }

  debug(message: string, metadata?: LogMetadata): void {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: LogMetadata): void {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: LogMetadata): void {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: LogMetadata): void {
    this.log('error', message, metadata);
  }

  setLevel(level: LogLevel): void {
    setConfig({ level });
  }
}

/**
 * Default logger instance
 */
export const logger: Logger = new LoggerImpl();

/**
 * Create a namespaced logger
 */
export function createLogger(namespace: string): Logger {
  return new LoggerImpl(namespace);
}

/**
 * Configure the global logger
 */
export function configureLogger(config: LoggerConfig): void {
  setConfig(config);
}
