import { PinoLogger } from "#infrastructure/logger/PinoLogger.js";
import healthCheckRouter from "#interfaces/routers/healthCheckRouter.js";
import userRouter from "#interfaces/routers/userRouter.js";
import bodyParser from "body-parser";
import express from "express";

const app = express();
export const logger = new PinoLogger();

const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use("/v1/healthcheck", healthCheckRouter);
app.use("/v1/users", userRouter);

export default app;
