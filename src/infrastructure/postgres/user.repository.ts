import { logger } from "#app.js";
import { User, UserRepository } from "#domain/entities/user.js";
import { AppError } from "#errors/error.js";
import { DatabaseError, Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

/**
 * PostgreSQL implementation of the UserRepository interface.
 *
 * This class serves as an adapter in the hexagonal architecture, connecting the
 * domain layer to the PostgreSQL database. It translates between domain entities
 * and database records, handling all PostgreSQL-specific operations while
 * maintaining the contract defined by the UserRepository interface.
 *
 * The repository uses a connection pool for efficient database access and
 * implements comprehensive error handling and logging for database operations.
 */
export class PostgresUserRepository implements UserRepository {
  /**
   * Creates a new PostgresUserRepository instance.
   *
   * @param db - PostgreSQL connection pool for database operations
   */
  constructor(private readonly db: Pool) {}

  /**
   * Creates a new user in the PostgreSQL database.
   *
   * @param user - User data without ID (ID will be generated using UUID v4)
   * @returns Promise resolving to the created User entity with assigned ID
   * @throws AppError with name "USER_ALEADY_EXISTS" if a user with the same email already exists
   * @throws Error if any other database error occurs
   */
  async create(user: Omit<User, "id">): Promise<User> {
    const id = uuidv4();
    const now = new Date().toISOString();
    logger.info("Creating user", { id, now, user });
    try {
      const result = await this.db.query(
        "INSERT INTO users (id, name, email, created_at) VALUES($1, $2, $3, $4) RETURNING id, name, email, created_at",
        [id, user.name, user.email, now],
      );
      logger.info("User created");
      return result.rows[0] as User;
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        if (err.code === "23505") {
          logger.error("User already exists");
          throw new AppError({
            message: "User already exists in database",
            name: "USER_ALEADY_EXISTS",
          });
        }
      }
      throw err;
    }
  }

  /**
   * Deletes a user from the PostgreSQL database by their ID.
   *
   * @param id - Unique identifier of the user to delete
   * @returns Promise resolving to boolean indicating whether deletion was successful
   *          (true if user was found and deleted, false if user was not found)
   */
  async delete(id: string): Promise<boolean> {
    logger.info("Deleting user", { id });
    const res = await this.db.query("DELETE FROM users WHERE id = $1", [id]);
    if (res.rowCount === 0) {
      logger.error("User not found");
      return false;
    }
    logger.info("User deleted");
    return true;
  }

  /**
   * Retrieves all users from the PostgreSQL database.
   *
   * @returns Promise resolving to an array of User entities
   *          (empty array if no users are found)
   */
  async findAll(): Promise<User[]> {
    logger.info("Finding all users");
    const res = await this.db.query(
      "SELECT id, name, email, created_at FROM users;",
    );
    if (res.rowCount === 0) {
      logger.error("No users found");
      return [];
    }
    return res.rows as User[];
  }

  /**
   * Finds a user in the PostgreSQL database by their unique identifier.
   *
   * @param id - Unique identifier of the user to find
   * @returns Promise resolving to the User entity if found, or null if not found
   */
  async findById(id: string): Promise<null | User> {
    logger.info("Finding user by id", { id });
    const res = await this.db.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [id],
    );
    if (res.rowCount === 0) {
      logger.error("User not found");
      return null;
    }
    return res.rows[0] as User;
  }

  /**
   * Updates an existing user's information in the PostgreSQL database.
   *
   * @param id - Unique identifier of the user to update
   * @param user - Partial user data containing only the fields to be updated
   * @returns Promise resolving to the updated User entity, or null if user not found
   */
  async update(
    id: string,
    user: Partial<Omit<User, "id">>,
  ): Promise<null | User> {
    logger.info("Updating user", { id, user });
    const res = await this.db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at",
      [user.name, user.email, id],
    );
    if (res.rowCount === 0) {
      logger.error("User not found");
      return null;
    }
    return res.rows[0] as User;
  }
}
