import { User, UserRepository } from "#domain/entities/user.js";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(user: Omit<User, "id">): Promise<User> {
    return this.userRepo.create(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepo.delete(id);
  }

  async getUser(id: string): Promise<null | User> {
    return this.userRepo.findById(id);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async updateUser(
    id: string,
    user: Partial<Omit<User, "id">>,
  ): Promise<null | User> {
    return this.userRepo.update(id, user);
  }
}
