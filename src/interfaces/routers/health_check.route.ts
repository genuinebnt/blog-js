import express from "express";

import healthCheckController from "../controllers/health_check.controller.js";
const router = express();

router.get("/", healthCheckController);

export default router;
