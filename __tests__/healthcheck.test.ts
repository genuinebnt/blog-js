import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../src/app.js";

describe("GET /healthcheck", () => {
  it("returns 200 for healthy server", async () => {
    const res = await request(app).get("/v1/healthcheck");
    expect(res.statusCode).toBe(200);
  });
});
