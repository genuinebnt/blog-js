import healthCheckRouter from "#interfaces/routers/healthCheckRouter.js";
import userRouter from "#interfaces/routers/userRouter.js";
import express from "express";

const app = express();
app.use("/v1/healthcheck", healthCheckRouter);
app.use("/v1/users", userRouter);

export default app;
