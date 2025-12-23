import { Snippet } from "../../generated/prisma/index.js";
import { SnippetRepository } from "../../repositories/snippet-repository.js";

interface IGetAllUserPublicSnippetsByLanguageUseCaseRequest {}

export class GetAllUserPublicSnippetsByLanguageUseCase {
  constructor(private snippetRepository: SnippetRepository) {}

  async execute(userId: string, language: string): Promise<Snippet[]> {
    const snippets =
      await this.snippetRepository.findAllPublicUserSnippetsByLanguage(
        userId,
        language,
      );
    return snippets;
  }
}
