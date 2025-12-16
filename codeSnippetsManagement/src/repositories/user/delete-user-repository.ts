import { prisma } from "../../lib/prisma.js";

export class DeleteUserByIdRepository {
  async execute(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
