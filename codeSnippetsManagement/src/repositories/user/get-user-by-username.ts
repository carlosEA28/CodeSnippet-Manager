import { prisma } from "../../lib/prisma";

export class GetUserByUsername {
  async execute(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }
}
