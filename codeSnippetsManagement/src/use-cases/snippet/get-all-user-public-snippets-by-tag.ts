import { Snippet } from "../../generated/prisma/index.js";
import { SnippetRepository } from "../../repositories/snippet-repository.js";

export class GetAllUserPublicSnippetsByTagUseCase {
  constructor(private snippetRepository: SnippetRepository) {}

  async execute(userId: string, tag: string): Promise<Snippet[]> {
    const snippets =
      await this.snippetRepository.findAllPublicUserSnippetsByTag(userId, tag);
    return snippets;
  }
}
