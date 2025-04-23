import app from "#app.js";
import http from "http";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let server: http.Server;
let port: number;

beforeAll(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  if (typeof address === "object" && address?.port) {
    port = address.port;
  }
});

afterAll(() => server.close());

describe("GET /v1/users", () => {
  it("returns 200", async () => {
    const res = await request(`http://localhost:${port.toString()}`).get(
      "/v1/users",
    );
    expect(res.status).toBe(200);
  });
});
