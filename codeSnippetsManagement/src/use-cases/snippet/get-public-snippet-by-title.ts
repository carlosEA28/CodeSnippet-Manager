import { SnippetRepository } from "../../repositories/snippet-repository.js";

export class GetPublicSnippetsByTitleUseCase {
  constructor(private snippetRepository: SnippetRepository) {}
  async execute(title: string) {
    const snippets = await this.snippetRepository.findSnippetByTitle(title);

    if (!snippets) {
      throw new Error("No snippets founds"); // fazer erro custom
    }

    return snippets;
  }
}
