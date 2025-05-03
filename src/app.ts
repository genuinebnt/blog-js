/**
 * Application setup module for the blog API service.
 *
 * This module serves as the central configuration coordinator for the Express application,
 * responsible for:
 * 1. Initializing the Express application
 * 2. Configuring global middleware (body parsing, logging, etc.)
 * 3. Mounting API routes with versioning
 * 4. Exporting the configured application and shared logger instance
 *
 * The application follows hexagonal architecture principles, with this module acting
 * as part of the infrastructure layer that connects the interfaces layer (routes and
 * controllers) to the HTTP server implementation.
 *
 * @module app
 */
import { PinoLogger } from "#infrastructure/logger/pino.logger.js";
import { pinoHTTPInstance } from "#infrastructure/logger/pino.logger.middleware.js";
import { errorHandler } from "#infrastructure/middleware/errors.js";
import healthCheckRouter from "#interfaces/routers/health_check.route.js";
import testRequestIdRouter from "#interfaces/routers/test-request-id.route.js";
import userRouter from "#interfaces/routers/user.router.js";
import bodyParser from "body-parser";
import express from "express";

/**
 * The Express application instance.
 * Acts as the main HTTP server application that handles requests and responses.
 */
const app = express();

/**
 * Configure middleware for request processing.
 *
 * Middleware is applied in order, with each processing the request before passing
 * it to the next middleware or route handler.
 */

/**
 * Body parser middleware to parse JSON request bodies.
 * Converts raw request bodies into JavaScript objects on req.body.
 */
app.use(bodyParser.json());

/**
 * Application-wide logger instance.
 * Provides structured logging capabilities throughout the application.
 * Exported for use in other modules that need logging functionality.
 */
export const logger = new PinoLogger();

/**
 * HTTP request logging middleware.
 * Logs incoming requests and outgoing responses with correlation IDs.
 * Uses AsyncLocalStorage to maintain request context for correlation.
 */
app.use(pinoHTTPInstance);

/**
 * Mount API routes with versioning.
 *
 * All routes are versioned with a /v1 prefix to facilitate future API evolution.
 * Routes are organized by resource or functionality domain.
 */

/**
 * Health check endpoint for monitoring and infrastructure integration.
 * @see {@link healthCheckRouter}
 */
app.use("/v1/healthcheck", healthCheckRouter);

/**
 * User resource endpoints for CRUD operations on users.
 * @see {@link userRouter}
 */
app.use("/v1/users", userRouter);

/**
 * Test endpoints for request ID and context tracking demonstration.
 * @see {@link testRequestIdRouter}
 */
app.use("/v1/test-request-id", testRequestIdRouter);

app.use(errorHandler);

/**
 * Export the configured Express application as the default export.
 * This allows server.ts or other entry points to import and start the HTTP server.
 */
export default app;
