/**
 * Custom application error class that extends the standard Error.
 *
 * AppError serves as the base error type for the application, providing a consistent
 * structure for error handling across the codebase. It allows for specific error types
 * to be identified through the 'name' property, enabling targeted error handling in
 * controllers and services.
 *
 * This error class is part of the application's error handling strategy that:
 * 1. Provides meaningful error messages for debugging
 * 2. Enables error categorization through named error types
 * 3. Supports consistent error responses to clients
 * 4. Facilitates centralized error logging and monitoring
 */
export class AppError extends Error {
  /** Descriptive message explaining the error */
  message: string;
  /** Identifier for the specific error type (e.g., 'USER_ALEADY_EXISTS') */
  name: string;

  /**
   * Creates a new AppError instance.
   *
   * @param params - Object containing error details
   * @param params.message - Descriptive message explaining the error
   * @param params.name - Identifier for the specific error type
   */
  constructor({ message, name }: { message: string; name: string }) {
    super();
    this.name = name;
    this.message = message;
  }
}
