/**
 * Logger interface that serves as a port in the hexagonal architecture.
 *
 * This interface defines the contract for logging functionality across the application.
 * Following the hexagonal architecture pattern, this port allows the domain to remain
 * isolated from specific logging implementation details. It enables different
 * logging adapters to be plugged in without affecting the domain logic.
 */
export interface Logger {
  /**
   * Logs a debug-level message.
   * Intended for detailed information useful during development and troubleshooting.
   *
   * @param message - The message to log
   * @param meta - Optional metadata to provide context for the log entry
   */
  debug(message: string, meta?: unknown): void;

  /**
   * Logs an error-level message.
   * Intended for error events that might still allow the application to continue running.
   *
   * @param message - The error message to log
   * @param meta - Optional metadata about the error context
   */
  error(message: string, meta?: unknown): void;

  /**
   * Logs an info-level message.
   * Intended for general informational events that highlight the progress of the application.
   *
   * @param message - The informational message to log
   * @param meta - Optional metadata to provide context for the log entry
   */
  info(message: string, meta?: unknown): void;

  /**
   * Logs a warning-level message.
   * Intended for potentially harmful situations that require attention.
   *
   * @param message - The warning message to log
   * @param meta - Optional metadata about the warning context
   */
  warn(message: string, meta?: unknown): void;
}
