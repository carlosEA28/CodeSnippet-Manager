import { SnippetRepository } from "../../repositories/snippet-repository.js";

export class DeleteSnippetUseCase {
  constructor(private snippetRepository: SnippetRepository) {}
  async execute(id: string) {
    const snippetExists = await this.snippetRepository.findSnippetById(id);

    if (!snippetExists) {
      throw new Error("Snippet not found");
    }

    await this.snippetRepository.deleteSnippet(id);
  }
}
