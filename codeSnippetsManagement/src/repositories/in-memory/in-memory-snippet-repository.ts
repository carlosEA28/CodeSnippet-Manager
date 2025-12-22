import { Snippet } from "../../generated/prisma/index.js";
import { SnippetRepository } from "../snippet-repository.js";
import { CreateSnippetRequestDto } from "../../dto/snippet/CreateSnippetRequestDto.js";

export class InMemorySnippetRepository implements SnippetRepository {
  public items: Snippet[] = [];

  async createSnippet({
    title,
    language,
    isPublic,
    userId,
    code,
    description,
    collectionId,
  }: CreateSnippetRequestDto): Promise<Snippet | null> {
    const snippet: Snippet = {
      id: crypto.randomUUID(),
      title,
      language,
      code,
      isPublic,
      userId,
      description: description ?? null,
      collectionId: collectionId ?? null,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(snippet);
    return snippet;
  }

  async deleteSnippet(id: string): Promise<void> {
    const index = this.items.findIndex((snippet) => snippet.id === id);
    if (index === -1) {
      throw new Error(`Snippet with id ${id} not found`);
    }
    this.items.splice(index, 1);
  }

  async findSnippetByTitle(title: string): Promise<Snippet | null> {
    return this.items.find((snippet) => snippet.title === title) || null;
  }

  async findAllSnippets(): Promise<Snippet[]> {
    return this.items;
  }

  async findAllPublicSnippets(): Promise<Snippet[]> {
    return this.items.filter((snippet) => snippet.isPublic);
  }

  async findAllSnippetsByTag(tagId: string): Promise<Snippet[]> {
    // This is a simplified implementation for in-memory testing.
    // A real implementation would involve checking the tags associated with the snippet.
    return [];
  }

  async findAllSnippetsByLanguage(language: string): Promise<Snippet[]> {
    return this.items.filter((snippet) => snippet.language === language);
  }

  async findSnippetById(id: string): Promise<Snippet | null> {
    return this.items.find((snippet) => snippet.id === id) || null;
  }

  async findRecentSnippets(): Promise<Snippet[]> {
    return this.items
      .filter((snippet) => snippet.isPublic)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }

  // User-specific methods
  async findAllUserSnippets(userId: string): Promise<Snippet[]> {
    return this.items.filter((snippet) => snippet.userId === userId);
  }

  async findAllPublicUserSnippets(userId: string): Promise<Snippet[]> {
    return this.items.filter(
      (snippet) => snippet.userId === userId && snippet.isPublic,
    );
  }

  async findAllPrivateUserSnippets(userId: string): Promise<Snippet[]> {
    return this.items.filter(
      (snippet) => snippet.userId === userId && !snippet.isPublic,
    );
  }

  async findAllPublicUserSnippetsByName(
    userId: string,
    name: string,
  ): Promise<Snippet[]> {
    return this.items.filter(
      (snippet) =>
        snippet.userId === userId &&
        snippet.isPublic &&
        snippet.title.includes(name),
    );
  }

  async findAllPrivateUserSnippetsByName(
    userId: string,
    name: string,
  ): Promise<Snippet[]> {
    return this.items.filter(
      (snippet) =>
        snippet.userId === userId &&
        !snippet.isPublic &&
        snippet.title.includes(name),
    );
  }

  async findAllUserPublicSnippetsByTag(
    userId: string,
    tagId: string,
  ): Promise<Snippet[]> {
    // Simplified for in-memory
    return [];
  }

  async findAllUserPrivateSnippetsByTag(
    userId: string,
    tagId: string,
  ): Promise<Snippet[]> {
    // Simplified for in-memory
    return [];
  }
}
