import { PinoLogger } from "#infrastructure/logger/pino.logger.js";
import { pinoHTTPInstance } from "#infrastructure/logger/pino.logger.middleware.js";
import healthCheckRouter from "#interfaces/routers/health_check.route.js";
import userRouter from "#interfaces/routers/user.router.js";
import bodyParser from "body-parser";
import express from "express";

const app = express();

export const logger = new PinoLogger();
app.use(pinoHTTPInstance);

app.use(bodyParser.json());

app.use("/v1/healthcheck", healthCheckRouter);
app.use("/v1/users", userRouter);

export default app;
