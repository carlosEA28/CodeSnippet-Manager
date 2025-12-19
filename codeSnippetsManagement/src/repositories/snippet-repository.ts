import { CreateSnippetRequestDto } from "../dto/snippet/CreateSnippetRequestDto.js";
import { Prisma, Snippet, Tag } from "../generated/prisma/index.js";

export interface SnippetRepository {
  createSnippet(params: CreateSnippetRequestDto): Promise<Snippet | null>;
  findSnippetByTitle(title: string): Promise<Snippet | null>;
  findTagsByIds(ids: string[]): Promise<Tag[]>;
}
