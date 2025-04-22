import express from "express";

import healthCheckController from "../controllers/healthCheckController.js";
const healthCheckRouter = express();

healthCheckRouter.get("/", healthCheckController);

export default healthCheckRouter;
