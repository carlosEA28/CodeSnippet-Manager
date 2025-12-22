import {CreateSnippetRequestDto} from "../../dto/snippet/CreateSnippetRequestDto.js";
import {Snippet} from "../../generated/prisma/index.js";
import {prisma} from "../../lib/prisma.js";
import {SnippetRepository} from "../snippet-repository.js";

export class PrismaSnippetRepository implements SnippetRepository {
  async deleteSnippet(id: string): Promise<void> {
    await prisma.snippet.delete({
      where: {
        id,
      },
    });
  }

  async findAllSnippets(): Promise<Snippet[]> {
    return prisma.snippet.findMany();
  }

  async findAllPublicSnippets(): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        isPublic: true,
      }
    });
  }

  async findAllSnippetsByTag(tagName: string): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        snippetTags: { // MUDOU AQUI
          some: {
            tag: {
              name: {
                equals: tagName,
                mode: 'insensitive'
              }
            }
          }
        },
        isPublic: true
      },
      include: {
        snippetTags: { // MUDOU AQUI
          include: {
            tag: true
          }
        }
      }
    });
  }

  async findAllSnippetsByLanguage(language: string): Promise<Snippet[]> {
    console.log('Buscando por language:', language);
    console.log('Tipo:', typeof language);
    console.log('Length:', language.length);
    console.log('Caracteres:', [...language].map(c => c.charCodeAt(0)));

    return await prisma.snippet.findMany({
      where: {
        language: {
          contains: language,
          mode: 'insensitive'
        },
        isPublic: true
      },
    });
  }
  async findSnippetById(id: string): Promise<Snippet | null> {
    const snippet = await prisma.snippet.findUnique({
      where: {
        id,
      },
    });
    return snippet;
  }

  async findRecentSnippets(): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where:{
        isPublic: true
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }

  async findAllUserSnippets(userId: string): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        userId,
      },
    });
  }
  async findAllPublicUserSnippets(userId: string): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        userId,
        isPublic: true,
      },
    });
  }


  async findAllPrivateUserSnippets(userId: string): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        userId,
        isPublic: false,
      },
    });
  }

  async findAllPublicUserSnippetsByName(
    userId: string,
    name: string,
  ): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        userId,
        isPublic: true,
        title: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async findAllPrivateUserSnippetsByName(
    userId: string,
    name: string,
  ): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        userId,
        isPublic: false,
        title: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }
  async findAllUserPublicSnippetsByTag(
    userId: string,
    tagId: string,
  ): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        userId,
        isPublic: true,
        snippetTags: {
          some: {
            tagId,
          },
        },
      },
    });
  }
  async findAllUserPrivateSnippetsByTag(
    userId: string,
    tagId: string,
  ): Promise<Snippet[]> {
    return await prisma.snippet.findMany({
      where: {
        userId,
        isPublic: false,
        snippetTags: {
          some: {
            tagId,
          },
        },
      },
    });
  }

  async findSnippetByTitle(title: string): Promise<Snippet | null> {
    return await prisma.snippet.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive'
        },
      },
    });
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
