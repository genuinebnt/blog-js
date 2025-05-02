import express from "express";

import healthCheckController from "../controllers/health_check.controller.js";

/**
 * Health check router that exposes endpoints for application health monitoring.
 *
 * This router is a critical component for operational reliability, providing:
 * - A dedicated endpoint for infrastructure monitoring systems
 * - Support for container orchestration health probes (e.g., Kubernetes liveness/readiness)
 * - Load balancer health verification
 * - DevOps visibility into service availability
 *
 * The health check endpoint is intentionally lightweight to minimize resource usage
 * while providing reliable indication of application availability. In production
 * environments, this endpoint is typically polled at regular intervals to ensure
 * the application is functioning correctly.
 *
 * @remarks
 * The health check endpoint responds with a simple 200 OK status when the application
 * is running properly. More sophisticated implementations might include deeper health
 * checks of database connections, cache availability, and other dependencies.
 */
const router = express();

/**
 * Defines the GET route for the health check endpoint.
 *
 * This single route handles all health check requests with a simple
 * HTTP 200 OK response, indicating the application is running and
 * able to process HTTP requests.
 */
router.get("/", healthCheckController);
export default router;
