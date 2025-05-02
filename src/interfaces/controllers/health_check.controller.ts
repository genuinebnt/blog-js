import { Request, Response } from "express";

/**
 * Health check controller that verifies the application is running and responding.
 *
 * This endpoint serves several critical purposes in production systems:
 * - Provides a simple endpoint for load balancers to verify service availability
 * - Enables automated monitoring systems to detect application failures
 * - Supports container orchestration systems (like Kubernetes) for readiness/liveness probes
 * - Allows for quick manual verification of deployment success
 *
 * The controller returns a simple 200 OK response without any payload, indicating
 * that the application is running and the HTTP server is responding to requests.
 * In more complex implementations, this might also check database connectivity,
 * cache services, or other dependencies.
 *
 * @param req - Express request object
 * @param res - Express response object used to send the health status
 * @returns void - The function completes when the response is sent
 */
const healthCheckController = (req: Request, res: Response) => {
  res.sendStatus(200);
};

export default healthCheckController;
