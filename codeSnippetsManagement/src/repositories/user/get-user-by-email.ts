import { prisma } from "../../lib/prisma";

export class GetUserByEmail {
  async execute(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
