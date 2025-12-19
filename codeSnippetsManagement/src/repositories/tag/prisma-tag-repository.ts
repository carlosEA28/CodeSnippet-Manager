import { Tag } from "../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { TagRepository } from "../tag-repository.js";

export class PrismaTagRepository implements TagRepository {
  async findTagsByIds(ids: string[]): Promise<Tag[]> {
    const tags = await prisma.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return tags;
  }
}
