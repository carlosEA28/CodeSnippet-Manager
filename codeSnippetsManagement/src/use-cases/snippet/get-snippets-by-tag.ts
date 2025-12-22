import {SnippetRepository} from "../../repositories/snippet-repository.js";

export class GetSnippetsByTagUseCase {
    constructor(private snippetRepository: SnippetRepository) {
    }
    async execute(tagId: string) {
        const snippets = await this.snippetRepository.findAllSnippetsByTag(tagId);

        if (!snippets || snippets.length === 0) {
            throw new Error("No snippets found for this tag"); //fazer erro custom
        }

        return snippets;
    }
}
