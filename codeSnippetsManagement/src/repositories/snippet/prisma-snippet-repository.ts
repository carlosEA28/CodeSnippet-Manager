import { CreateSnippetRequestDto } from "../../dto/snippet/CreateSnippetRequestDto.js";
import { Prisma, Snippet, Tag } from "../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { SnippetRepository } from "../snippet-repository.js";

export class PrismaSnippetRepository implements SnippetRepository {
  async deleteSnippet(id: string): Promise<void> {
    await prisma.snippet.delete({
      where: {
        id,
      },
    });
  }
  findAllSnippets(): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllPublicSnippets(): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllSnippetsByTag(tagId: string): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllSnippetsByLanguage(language: string): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  async findSnippetById(id: string): Promise<Snippet | null> {
    const snippet = await prisma.snippet.findUnique({
      where: {
        id,
      },
    });
    return snippet;
  }
  findRecentSnippets(): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllUserSnippets(userId: string): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllPublicUserSnippets(userId: string): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllPrivateUserSnippets(userId: string): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllPublicUserSnippetsByName(
    userId: string,
    name: string,
  ): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllPrivateUserSnippetsByName(
    userId: string,
    name: string,
  ): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllUserPublicSnippetsByTag(
    userId: string,
    tagId: string,
  ): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
  }
  findAllUserPrivateSnippetsByTag(
    userId: string,
    tagId: string,
  ): Promise<Snippet[]> {
    throw new Error("Method not implemented.");
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
