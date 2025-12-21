import {SnippetRepository} from "../../repositories/snippet-repository.js";

export class GetAllPublicSnippetsUseCase{
    constructor(private snippetsRepository: SnippetRepository) {
    }
    async execute(){
        const snippets = this.snippetsRepository.findAllPublicSnippets()

        if(!snippets){
            throw new Error("No public snippets"); //fazer error custom
        }

        return snippets
    }
}