import { logger } from './logger';
import type { Timer } from './types';

/**
 * Performance timer for measuring execution time
 */
class TimerImpl implements Timer {
  private startTime: number;
  private label: string;
  private laps: Array<{ label: string; time: number }> = [];

  constructor(label: string) {
    this.label = label;
    this.startTime = performance.now();
    logger.debug(`⏱️ Timer started: ${label}`);
  }

  /**
   * Record a lap time with label
   */
  lap(label: string): number {
    const lapTime = performance.now() - this.startTime;
    this.laps.push({ label, time: lapTime });
    logger.debug(`⏱️ ${this.label} - ${label}: ${lapTime.toFixed(2)}ms`);
    return lapTime;
  }

  /**
   * End the timer and log total time
   */
  end(): number {
    const endTime = performance.now();
    const duration = endTime - this.startTime;

    const lapsInfo =
      this.laps.length > 0
        ? ` (${this.laps.map((l) => `${l.label}: ${l.time.toFixed(2)}ms`).join(', ')})`
        : '';

    logger.info(`⏱️ ${this.label} completed in ${duration.toFixed(2)}ms${lapsInfo}`);
    return duration;
  }
}

/**
 * Create a performance timer
 */
export function createTimer(label: string): Timer {
  return new TimerImpl(label);
}

/**
 * Measure async function execution time
 */
export async function measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const timer = createTimer(label);
  try {
    const result = await fn();
    timer.end();
    return result;
  } catch (error) {
    timer.end();
    throw error;
  }
}

/**
 * Measure sync function execution time
 */
export function measure<T>(label: string, fn: () => T): T {
  const timer = createTimer(label);
  try {
    const result = fn();
    timer.end();
    return result;
  } catch (error) {
    timer.end();
    throw error;
  }
}
