/**
 * Application entry point for the blog API service.
 *
 * This module initializes and starts the HTTP server for the application.
 * It serves as the main entry point when the application is launched and is
 * responsible for:
 *
 * 1. Importing the configured Express application
 * 2. Determining the server port from environment variables
 * 3. Starting the HTTP server and listening for incoming requests
 * 4. Logging server startup information
 *
 * @module index
 */
import app, { logger } from "./app.js";

/**
 * Server port configuration.
 *
 * The port is determined from the PORT environment variable if available,
 * otherwise it defaults to 8000. This allows for flexible deployment across
 * different environments where the port might be dynamically assigned.
 *
 * @example
 * // Set the port via environment variable:
 * // PORT=3000 npm run dev
 */
const port = process.env.PORT ?? "8000";

/**
 * Start the HTTP server and listen for incoming requests.
 *
 * This initiates the Express application server on the configured port
 * and sets up a callback that logs when the server is successfully started.
 *
 * @listens {port} - The port number the server listens on
 */
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`, { port });
});
