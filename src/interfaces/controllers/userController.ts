import { UserService } from "#application/userService.js";
import { User } from "#domain/entities/user.js";
import { Request, Response } from "express";

export class UserController {
  constructor(private readonly userService: UserService) {}

  createUser = async (
    req: Request<unknown, unknown, Omit<User, "id">>,
    res: Response,
  ) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  };

  deleteUser = async (req: Request, res: Response) => {
    const isSuccess = await this.userService.deleteUser(req.params.id);
    if (!isSuccess) {
      return res.status(404).send("User not found ");
    }
    res.status(204).send();
  };

  getUser = async (req: Request, res: Response) => {
    const user = await this.userService.getUser(req.params.id);
    if (!user) {
      return res.status(404).send("Not found");
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
      return res.status(404).send("User not found");
    }
    res.json(updated);
  };
}
