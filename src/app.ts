import { PinoLogger } from "#infrastructure/logger/pino.logger.js";
import { pinoHTTPInstance } from "#infrastructure/logger/pino.logger.middleware.js";
import healthCheckRouter from "#interfaces/routers/health_check.route.js";
import testRequestIdRouter from "#interfaces/routers/test.request-id.route.js";
import userRouter from "#interfaces/routers/user.router.js";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

export const logger = new PinoLogger();
app.use(pinoHTTPInstance);

app.use("/v1/healthcheck", healthCheckRouter);
app.use("/v1/users", userRouter);
app.use("/v1/test-request-id", testRequestIdRouter);

export default app;
