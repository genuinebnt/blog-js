import { logger } from "#app.js";
import { requestContext } from "#infrastructure/context/request-context.js";
import express, { Request, Response } from "express";

const router = express.Router();

/**
 * Simulates an asynchronous service operation
 * This function is not directly connected to the HTTP request/response cycle
 * but should still have access to the request ID through the AsyncLocalStorage
 */
async function simulateAsyncServiceOperation(): Promise<void> {
  // Simulate some async work
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Log from within the async operation to verify request ID is included
  logger.info("Async operation completed", { operation: "simulate" });
}

/**
 * Simulates a database operation with a potential error
 * Used to test error logging with request ID
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

// Basic info logging endpoint
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

// Endpoint with all log levels
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

// Endpoint that simulates an error condition
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
