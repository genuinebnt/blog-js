import app from "app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("GET /healthcheck", () => {
  it("returns 200 for healthy server", async () => {
    const res = await request(app).get("/v1/healthcheck");
    expect(res.statusCode).toBe(200);
  });
});
