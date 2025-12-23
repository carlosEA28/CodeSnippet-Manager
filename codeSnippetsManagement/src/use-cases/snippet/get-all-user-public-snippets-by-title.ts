import { Snippet } from "../../generated/prisma/index.js";
import { SnippetRepository } from "../../repositories/snippet-repository.js";

export class GetAllUserPublicSnippetsByTitleUseCase {
  constructor(private snippetRepository: SnippetRepository) {}

  async execute(userId: string, title: string): Promise<Snippet[]> {
    const snippets =
      await this.snippetRepository.findAllPublicUserSnippetsByTitle(
        userId,
        title,
      );
    return snippets;
  }
}
