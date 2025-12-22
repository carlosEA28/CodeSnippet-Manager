import {SnippetRepository} from "../../repositories/snippet-repository.js";

export class GetSnippetsByLanguageUseCase {
    constructor(private snippetRepository: SnippetRepository) {
    }
    async execute(language: string) {
        const snippets = await this.snippetRepository.findAllSnippetsByLanguage(language);

        if (!snippets || snippets.length === 0) {
            throw new Error("No snippets found for this language"); //fazer erro custom
        }

        return snippets;
    }
}
