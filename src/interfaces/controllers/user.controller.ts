import { UserService } from "#application/user.service.js";
import { User } from "#domain/entities/user.js";
import { Request, Response } from "express";

/**
 * Controller responsible for handling HTTP requests related to User resources.
 *
 * In the hexagonal architecture, the UserController acts as an adapter in the
 * interfaces layer that translates between HTTP requests/responses and the
 * application service layer. It:
 *
 * 1. Extracts and validates request data from HTTP requests
 * 2. Calls appropriate methods on the UserService to execute business logic
 * 3. Transforms service results into appropriate HTTP responses
 * 4. Handles errors and maps them to appropriate HTTP status codes
 *
 * This controller follows a RESTful API design pattern for managing user resources.
 */
export class UserController {
  /**
   * Creates a UserController instance.
   *
   * @param userService - Service that implements user-related business logic
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Handles HTTP requests to create a new user.
   *
   * @param req - Express request object containing the user data in the request body
   * @param res - Express response object used to send the HTTP response
   *
   * @returns Promise that resolves when the response has been sent
   *
   * @remarks
   * - Returns 201 Created with the user object if creation is successful
   * - Returns 409 Conflict if a user with the same email already exists
   */
  createUser = async (
    req: Request<unknown, unknown, Omit<User, "created_at" | "id">>,
    res: Response,
  ) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  };

  /**
   * Handles HTTP requests to delete a user by ID.
   *
   * @param req - Express request object containing the user ID in request parameters
   * @param res - Express response object used to send the HTTP response
   *
   * @returns Promise that resolves when the response has been sent
   *
   * @remarks
   * - Returns 204 No Content if deletion is successful
   * - Returns 404 Not Found if the user with the specified ID doesn't exist
   */
  deleteUser = async (req: Request, res: Response) => {
    const isSuccess = await this.userService.deleteUser(req.params.id);
    if (!isSuccess) {
      res.status(404).send("User not found");
      return;
    }
    res.status(204).send();
  };

  /**
   * Handles HTTP requests to retrieve a user by ID.
   *
   * @param req - Express request object containing the user ID in request parameters
   * @param res - Express response object used to send the HTTP response
   *
   * @returns Promise that resolves when the response has been sent
   *
   * @remarks
   * - Returns 200 OK with the user object if found
   * - Returns 404 Not Found if the user with the specified ID doesn't exist
   */
  getUser = async (req: Request, res: Response) => {
    const user = await this.userService.getUser(req.params.id);
    if (!user) {
      res.status(404).send("Not found");
      return;
    }
    res.json(user);
  };

  /**
   * Handles HTTP requests to retrieve all users.
   *
   * @param req - Express request object
   * @param res - Express response object used to send the HTTP response
   *
   * @returns Promise that resolves when the response has been sent
   *
   * @remarks
   * - Returns 200 OK with an array of user objects (empty array if no users exist)
   */
  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    res.json(users);
  };

  /**
   * Handles HTTP requests to update a user by ID.
   *
   * @param req - Express request object containing the user ID in request parameters
   *              and update data in the request body
   * @param res - Express response object used to send the HTTP response
   *
   * @returns Promise that resolves when the response has been sent
   *
   * @remarks
   * - Returns 200 OK with the updated user object if update is successful
   * - Returns 404 Not Found if the user with the specified ID doesn't exist
   */
  updateUser = async (
    req: Request<{ id: string }, unknown, Partial<Omit<User, "id">>>,
    res: Response,
  ) => {
    const updated = await this.userService.updateUser(req.params.id, req.body);
    if (!updated) {
      res.status(404).send("User not found");
      return;
    }
    res.json(updated);
  };
}
