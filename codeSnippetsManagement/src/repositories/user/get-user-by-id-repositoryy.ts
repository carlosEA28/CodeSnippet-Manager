import { prisma } from "../../lib/prisma.js";

export class GetUserbyIdRepostiory {
  async execute(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  }
}
