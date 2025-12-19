import { CreateSnippetRequestDto } from "../dto/snippet/CreateSnippetRequestDto.js";
import { Snippet } from "../generated/prisma/index.js";

export interface SnippetRepository {
  createSnippet(params: CreateSnippetRequestDto): Promise<Snippet | null>;
  deleteSnippet(id: string): Promise<void>;
  findSnippetByTitle(title: string): Promise<Snippet | null>;
  findAllSnippets(): Promise<Snippet[]>;
  findAllPublicSnippets(): Promise<Snippet[]>;
  findAllSnippetsByTag(tagId: string): Promise<Snippet[]>;
  findAllSnippetsByLanguage(language: string): Promise<Snippet[]>; // quando criar uma tabela propria, mudar para languageId
  findSnippetById(id: string): Promise<Snippet | null>;
  findRecentSnippets(): Promise<Snippet[]>;

  //user
  findAllUserSnippets(userId: string): Promise<Snippet[]>;
  findAllPublicUserSnippets(userId: string): Promise<Snippet[]>;
  findAllPrivateUserSnippets(userId: string): Promise<Snippet[]>;
  findAllPublicUserSnippetsByName(
    userId: string,
    name: string,
  ): Promise<Snippet[]>;
  findAllPrivateUserSnippetsByName(
    userId: string,
    name: string,
  ): Promise<Snippet[]>;
  findAllUserPublicSnippetsByTag(
    userId: string,
    tagId: string,
  ): Promise<Snippet[]>;
  findAllUserPrivateSnippetsByTag(
    userId: string,
    tagId: string,
  ): Promise<Snippet[]>;
}
