import { Snippet } from "../../generated/prisma/index.js";
import { SnippetRepository } from "../../repositories/snippet-repository.js";

export class GetAllUserPublicSnippetsUseCase {
  constructor(private snippetRepository: SnippetRepository) {}

  async execute(userId: string): Promise<Snippet[]> {
    const snippets =
      await this.snippetRepository.findAllPublicUserSnippets(userId);
    return snippets;
  }
}
