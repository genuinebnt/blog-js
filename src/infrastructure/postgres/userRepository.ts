import { User, UserRepository } from "#domain/entities/user.js";
import { AppError } from "#errors/error.js";
import { DatabaseError, Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly db: Pool) {}

  async create(user: Omit<User, "id">): Promise<User> {
    const id = uuidv4();
    const now = new Date().toISOString();
    try {
      const result = await this.db.query(
        "INSERT INTO users (id, name, email, created_at) VALUES($1, $2, $3, $4) RETURNING id, name, email, created_at",
        [id, user.name, user.email, now],
      );
      return result.rows[0] as User;
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        if (err.code === "23505") {
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
    const res = await this.db.query("DELETE FROM users WHERE id = $1", [id]);
    return (res.rowCount ?? 0) > 0;
  }

  async findAll(): Promise<User[]> {
    const res = await this.db.query(
      "SELECT id, name, email, created_at FROM users;",
    );
    return res.rows as User[];
  }

  async findById(id: string): Promise<null | User> {
    const res = await this.db.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [id],
    );
    return res.rows[0] as User;
  }

  async update(
    id: string,
    user: Partial<Omit<User, "id">>,
  ): Promise<null | User> {
    const res = await this.db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at",
      [user.name, user.email, id],
    );
    return res.rows[0] as User;
  }
}
