import {SnippetRepository} from "../../repositories/snippet-repository.js";

export class GetRecentSnippetsUseCase {
    constructor(private snippetRepository: SnippetRepository) {
    }
    async execute() {
        const snippets = await this.snippetRepository.findRecentSnippets();

        if (!snippets || snippets.length === 0) {
            throw new Error("No recent snippets found"); //fazer erro custom
        }

        return snippets;
    }
}
