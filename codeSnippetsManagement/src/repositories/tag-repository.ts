import { Tag } from "../generated/prisma/index.js";

export interface TagRepository {
  findTagsByIds(ids: string[]): Promise<Tag[]>;
}
