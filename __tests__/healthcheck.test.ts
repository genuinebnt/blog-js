import pool from "#config/db.js";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("GET /healthcheck", () => {
  it("returns 200 for healthy server", async ({ port }) => {
    await pool.query("SELECT 1;");

    const res = await request(`http://localhost:${port.toString()}`).get(
      "/v1/healthcheck",
    );
    expect(res.statusCode).toBe(200);
  });
});
