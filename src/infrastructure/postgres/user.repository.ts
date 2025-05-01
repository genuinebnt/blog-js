import { logger } from "#app.js";
import { User, UserRepository } from "#domain/entities/user.js";
import { AppError } from "#errors/error.js";
import { DatabaseError, Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly db: Pool) {}

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
