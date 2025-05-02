import { logger } from "#app.js";
import { requestContext } from "#infrastructure/context/request-context.js";
import express, { Request, Response } from "express";

/**
 * Test Router for demonstrating request context tracking and logging functionality.
 *
 * This router provides endpoints that showcase how the request ID is:
 * - Propagated through asynchronous operations via AsyncLocalStorage
 * - Included in log messages for correlation and traceability
 * - Available throughout the request lifecycle
 *
 * These endpoints serve as both a demonstration and testing tool for the
 * request context functionality, which is critical for proper log correlation
 * in a production environment with high request volume.
 */
const router = express.Router();
/**
 * Simulates an asynchronous service operation in the application.
 *
 * This function demonstrates how request context (specifically the request ID)
 * is maintained across asynchronous boundaries through AsyncLocalStorage.
 * Though not directly connected to the HTTP request/response cycle,
 * it should still have access to the request ID, allowing for proper
 * log correlation even in deeply nested async operations.
 *
 * @returns Promise that resolves when the simulated operation completes
 */
async function simulateAsyncServiceOperation(): Promise<void> {
  // Simulate some async work
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Log from within the async operation to verify request ID is included
  logger.info("Async operation completed", { operation: "simulate" });
}

/**
 * Simulates a database operation that may succeed or fail.
 *
 * This function demonstrates how error logs maintain request context,
 * ensuring that errors can be correlated to the original request.
 * It's particularly useful for showing how errors in deeper layers of
 * the application still maintain the request ID for proper debugging.
 *
 * @param shouldFail - Boolean flag to determine if the operation should throw an error
 * @returns Promise resolving to a mock database result string
 * @throws Error when shouldFail is true, simulating a database connection error
 */
async function simulateDatabaseOperation(shouldFail: boolean): Promise<string> {
  // Simulate some async work
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (shouldFail) {
    logger.error("Database operation failed", { operation: "database" });
    throw new Error("Database connection error");
  }

  logger.debug("Database operation successful", { operation: "database" });
  return "Database result";
}

/**
 * Basic endpoint that demonstrates request ID logging and retrieval.
 *
 * This route:
 * 1. Logs an info message with the current request ID
 * 2. Retrieves the request ID from the context
 * 3. Executes an async operation to show context propagation
 * 4. Returns the request ID in the response
 *
 * @route GET /v1/test-request-id
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response containing the request ID and a message
 */
router.get("/", async (req: Request, res: Response) => {
  // Log basic info message
  logger.info("Request received on test endpoint");

  // Get the current request ID from context to display in response
  const requestId = requestContext.getRequestId();

  // Perform an async operation
  await simulateAsyncServiceOperation();

  // Return the request ID in the response
  res.json({
    message: "Request ID logging test",
    requestId,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Endpoint that demonstrates all available log levels with request context.
 *
 * This route shows how request IDs are included in logs of all severity levels
 * (debug, info, warn, error). It helps verify that the logging middleware
 * correctly attaches the request ID to all log messages regardless of level.
 *
 * @route GET /v1/test-request-id/all-levels
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response confirming all log levels were tested
 */
router.get("/all-levels", (req: Request, res: Response) => {
  logger.debug("Debug message from test endpoint", { level: "debug" });
  logger.info("Info message from test endpoint", { level: "info" });
  logger.warn("Warning message from test endpoint", { level: "warn" });
  logger.error("Error message from test endpoint", { level: "error" });

  res.json({
    message: "All log levels tested",
    requestId: requestContext.getRequestId(),
  });
});

/**
 * Endpoint that demonstrates error handling with request context tracking.
 *
 * This route simulates an error scenario to show how request IDs are preserved:
 * 1. In error logs from lower-level services
 * 2. When catching and handling exceptions
 * 3. In error responses sent back to the client
 *
 * This is particularly important for debugging production issues where
 * correlating client errors with server logs is essential.
 *
 * @route GET /v1/test-request-id/error
 * @param req - Express request object
 * @param res - Express response object
 * @returns 500 status with JSON error response containing the request ID
 */
router.get("/error", async (req: Request, res: Response) => {
  logger.info("Starting potentially failing operation");

  try {
    // This will throw an error
    await simulateDatabaseOperation(true);
    res.json({ success: true });
  } catch (error) {
    // The error logs inside simulateDatabaseOperation should include request ID
    logger.error("Error caught in route handler", { error });
    res.status(500).json({
      message: "Operation failed",
      requestId: requestContext.getRequestId(),
    });
  }
});

export default router;
