import { UserService } from "#application/user.service.js";
import pool from "#config/db.js";
import { PostgresUserRepository } from "#infrastructure/postgres/user.repository.js";
import { UserController } from "#interfaces/controllers/user.controller.js";
import express from "express";

/**
 * User resource router that defines REST API endpoints for user operations.
 *
 * This router is responsible for:
 * 1. Setting up the dependency injection chain for user-related components
 * 2. Mapping HTTP routes to controller methods
 * 3. Exposing a RESTful API interface for user CRUD operations
 *
 * The router follows a clean architecture approach with proper separation of concerns:
 * - Routes define the API contract and delegate to the controller
 * - Controller handles HTTP specifics and delegates to the service
 * - Service implements business logic and delegates to the repository
 * - Repository handles data persistence
 *
 * @example
 * // Routes exposed by this router when mounted at "/v1/users":
 * // GET    /v1/users       - List all users
 * // GET    /v1/users/:id   - Get a specific user by ID
 * // POST   /v1/users       - Create a new user
 * // PUT    /v1/users/:id   - Update a user by ID
 * // DELETE /v1/users/:id   - Delete a user by ID
 */
const router = express();

/**
 * Dependency injection setup for user-related components.
 *
 * This follows a bottom-up dependency injection pattern:
 * 1. The repository is created with a database connection
 * 2. The service is created with the repository
 * 3. The controller is created with the service
 *
 * This approach facilitates testing by allowing mock implementations
 * to be injected at any level of the dependency chain.
 */
const userRepo = new PostgresUserRepository(pool);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

/**
 * RESTful route definitions for user resources.
 *
 * Each route delegates to the appropriate controller method:
 * - GET collection: List all users
 * - GET resource: Get a specific user by ID
 * - POST: Create a new user
 * - PUT: Update an existing user
 * - DELETE: Remove a user
 *
 * The routes follow RESTful conventions where HTTP methods define
 * the operation and URL patterns identify the resource.
 */
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
