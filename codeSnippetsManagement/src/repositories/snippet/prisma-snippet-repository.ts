import { CreateSnippetRequestDto } from "../../dto/snippet/CreateSnippetRequestDto.js";
import { Prisma, Snippet, Tag } from "../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { SnippetRepository } from "../snippet-repository.js";

export class PrismaSnippetRepository implements SnippetRepository {
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
  async findSnippetByTitle(title: string): Promise<Snippet | null> {
    const snippet = await prisma.snippet.findFirst({
      where: {
        title,
      },
    });
    return snippet;
  }
  async createSnippet(
    params: CreateSnippetRequestDto,
  ): Promise<Snippet | null> {
    const snippet = await prisma.snippet.create({
      data: {
        title: params.title,
        description: params.description,
        code: params.code,
        language: params.language,
        isPublic: params.isPublic,
        userId: params.userId,
        collectionId: params.collectionId,

        snippetTags: {
          create:
            params.tagsId?.map((tagId) => ({
              tag: { connect: { id: tagId } },
            })) || [],
        },
      },
      include: {
        user: {
          select: { id: true, username: true },
        },
        snippetTags: {
          omit: {
            createdAt: true,
            id: true,
            tagId: true,
            snippetId: true,
          },
          include: {
            tag: true,
          },
        },
      },
    });

    return snippet;
  }
}
