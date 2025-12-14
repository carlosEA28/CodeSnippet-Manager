import { prisma } from "../../lib/prisma";

interface CreateUserData {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

export class CreateUserRepository {
  async execute(data: CreateUserData) {
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
}
