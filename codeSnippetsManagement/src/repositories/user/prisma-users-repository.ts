import { Prisma, User } from "../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { UserRepository } from "../user-repository.js";

export class PrismaUsersRepository implements UserRepository {
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  async getUserByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        username: data.username,
        avatarUrl: data.avatarUrl,
      },
    });
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    return prisma.user.update({ where: { id }, data: updates });
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
