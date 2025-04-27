import { UserService } from "#application/user.service.js";
import { User } from "#domain/entities/user.js";
import { AppError } from "#errors/error.js";
import { Request, Response } from "express";

export class UserController {
  constructor(private readonly userService: UserService) {}

  createUser = async (
    req: Request<unknown, unknown, Omit<User, "created_at" & "id">>,
    res: Response,
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof AppError) {
        if (err.name === "USER_ALEADY_EXISTS") {
          res.status(409).json({ message: err.message });
        }
      }
      res.status(500).json({ message: "Error processing request" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const isSuccess = await this.userService.deleteUser(req.params.id);
    if (!isSuccess) {
      res.status(404).send("User not found ");
      return;
    }
    res.status(204).send();
  };

  getUser = async (req: Request, res: Response) => {
    const user = await this.userService.getUser(req.params.id);
    if (!user) {
      res.status(404).send("Not found");
      return;
    }
    res.json(user);
  };

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    res.json(users);
  };

  updateUser = async (
    req: Request<{ id: string }, unknown, Partial<Omit<User, "id">>>,
    res: Response,
  ) => {
    const updated = await this.userService.updateUser(req.params.id, req.body);
    if (!updated) {
      res.status(404).send("User not found");
      return;
    }
    res.json(updated);
  };
}
