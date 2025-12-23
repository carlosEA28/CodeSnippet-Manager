import { Snippet } from "../../generated/prisma/index.js";
import { SnippetRepository } from "../../repositories/snippet-repository.js";

export class GetAllUserSnippetsUseCase {
  constructor(private snippetRepository: SnippetRepository) {}

  async execute(userId: string): Promise<Snippet[]> {
    const snippets = await this.snippetRepository.findAllUserSnippets(userId);
    return snippets;
  }
}
