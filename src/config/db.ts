import { Pool } from "pg";

/**
 * PostgreSQL connection pool configuration.
 *
 * This module creates and exports a connection pool for PostgreSQL database access.
 * A connection pool is a cache of database connections maintained so that the
 * connections can be reused when future requests to the database are required.
 *
 * Benefits of using a connection pool:
 * - Improves performance by reusing existing connections
 * - Reduces connection overhead and latency
 * - Handles connection limits efficiently
 * - Provides better stability for the application under load
 *
 * The connection string is obtained from the DATABASE_URL environment variable,
 * which should be set in the application's environment or .env file with the format:
 * postgresql://username:password@host:port/database
 *
 * @example
 * // Import and use the pool in a repository
 * import pool from "#config/db.js";
 * const result = await pool.query("SELECT * FROM users");
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
