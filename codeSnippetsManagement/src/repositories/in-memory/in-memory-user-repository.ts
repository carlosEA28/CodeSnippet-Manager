import { User, Prisma } from "../../generated/prisma/index.js";
import { UserRepository } from "../user-repository.js";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async getUserById(id: string): Promise<User | null> {
    return this.items.find((user) => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.items.find((user) => user.username === username);
  }
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: crypto.randomUUID(),
      email: data.email,
      username: data.username,
      avatarUrl: data.avatarUrl,
      totalSnippets: 0,
      totalPublicSnippets: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(user);

    return user;
  }
  async deleteUser(id: string): Promise<void> {
    const index = this.items.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    this.items.splice(index, 1);
  }
}
