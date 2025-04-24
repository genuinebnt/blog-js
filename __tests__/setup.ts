import app from "#app.js";
import pool from "#config/db.js";
import http from "http";
import { afterEach, beforeEach } from "vitest";

declare module "vitest" {
  export interface TestContext {
    address: string;
    port: number;
  }
}

let server: http.Server;

beforeEach(async (context) => {
  await pool.query("BEGIN;");
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const url = server.address();
  if (typeof url === "object" && url?.port) {
    context.address = `http://localhost:${url.port.toString()}`;
    context.port = url.port;
  }
});

afterEach(async () => {
  await pool.query("ROLLBACK;");
  server.close();
});
