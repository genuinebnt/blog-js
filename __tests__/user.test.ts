import request from "supertest";
import { describe, expect, it } from "vitest";

interface UserRequestBody {
  email: string;
  name: string;
}

describe("GET /v1/users", () => {
  it("returns 200", async ({ address }) => {
    const res = await request(address).get("/v1/users");
    expect(res.status).toBe(200);
  });
});

describe("POST /v1/users", () => {
  it("returns 201 for valid user data", async ({ address }) => {
    const validUser: UserRequestBody = {
      email: "genuine.basilnt@gmail.com",
      name: "genuine",
    };

    const req = request(address)
      .post("/v1/users")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    const res = await req.send(validUser);
    expect(res.status).toBe(201);
  });

  it("returns 409 for duplicate valid user data", async ({ address }) => {
    const validUser: UserRequestBody = {
      email: "genuine.basilnt@gmail.com",
      name: "genuine",
    };

    await request(address)
      .post("/v1/users")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(validUser);

    const res = await request(address)
      .post("/v1/users")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(validUser);

    expect(res.status).toBe(409);
  });
});
