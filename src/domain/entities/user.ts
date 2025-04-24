export interface User {
  email: string;
  id: string;
  name: string;
}

export interface UserRepository {
  create(user: Omit<User, "id">): Promise<User>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<null | User>;
  update(id: string, user: Partial<Omit<User, "id">>): Promise<null | User>;
}
