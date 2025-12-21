import {SnippetRepository} from "../../repositories/snippet-repository.js";

export class GetAllSnippetsUseCase{
    constructor(private snippetRepostory: SnippetRepository) {
    }
    async execute(){
        const snippets = await this.snippetRepostory.findAllSnippets()

        if(!snippets){
            throw new Error("No snippets found"); //fazer erro custom
        }

        return snippets
    }
}