import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.VITE_DATABASE_URL,
});

export default pool;
