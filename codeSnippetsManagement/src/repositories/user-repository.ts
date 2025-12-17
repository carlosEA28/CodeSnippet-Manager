import { Prisma, User } from "../generated/prisma/index.js";

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
