import express from "express";

import healthCheckController from "../controllers/healthCheckController.js";
const router = express();

router.get("/", healthCheckController);

export default router;
