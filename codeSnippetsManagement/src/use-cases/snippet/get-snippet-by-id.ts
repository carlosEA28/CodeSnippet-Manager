import {SnippetRepository} from "../../repositories/snippet-repository.js";

export class GetSnippetByIdUseCase {
    constructor(private snippetRepository: SnippetRepository) {
    }
    async execute(id: string) {
        const snippet = await this.snippetRepository.findSnippetById(id);

        if (!snippet) {
            throw new Error("Snippet not found"); //fazer erro custom
        }

        return snippet;
    }
}
