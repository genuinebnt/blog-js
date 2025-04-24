import { UserService } from "#application/userService.js";
import pool from "#config/db.js";
import { PostgresUserRepository } from "#infrastructure/postgres/userRepository.js";
import { UserController } from "#interfaces/controllers/userController.js";
import express from "express";

const router = express();

const userRepo = new PostgresUserRepository(pool);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
