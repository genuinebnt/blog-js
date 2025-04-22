import healthCheckRouter from "#interfaces/routers/healthCheckRouter.js";
import express from "express";

const app = express();
app.use("/v1/healthcheck", healthCheckRouter);

export default app;
