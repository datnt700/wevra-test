/**
 * Log level types
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Metadata attached to log entries
 */
export interface LogMetadata {
  [key: string]: any;
}

/**
 * Logger configuration options
 */
export interface LoggerConfig {
  /**
   * Minimum log level to output
   * @default 'info'
   */
  level?: LogLevel;

  /**
   * Enable/disable logging globally
   * @default true in dev, false in production
   */
  enabled?: boolean;

  /**
   * Enable colored console output (dev only)
   * @default true
   */
  enableColors?: boolean;

  /**
   * Enable timestamps in logs
   * @default true
   */
  enableTimestamps?: boolean;

  /**
   * Keys to filter from metadata (sensitive data)
   * @default ['password', 'token', 'secret', 'apiKey', 'accessToken']
   */
  sensitiveKeys?: string[];

  /**
   * Custom log formatter
   */
  formatter?: (level: LogLevel, message: string, metadata?: LogMetadata) => string;

  /**
   * Send logs to external service (e.g., analytics)
   */
  onLog?: (level: LogLevel, message: string, metadata?: LogMetadata) => void;
}

/**
 * Logger instance interface
 */
export interface Logger {
  debug(message: string, metadata?: LogMetadata): void;
  info(message: string, metadata?: LogMetadata): void;
  warn(message: string, metadata?: LogMetadata): void;
  error(message: string, metadata?: LogMetadata): void;
  setLevel(level: LogLevel): void;
}

/**
 * Timer interface for performance logging
 */
export interface Timer {
  end(): number;
  lap(label: string): number;
}
