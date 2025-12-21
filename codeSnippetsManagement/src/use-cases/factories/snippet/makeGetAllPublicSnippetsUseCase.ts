import {PrismaSnippetRepository} from "../../../repositories/snippet/prisma-snippet-repository.js";
import {GetAllPublicSnippetsUseCase} from "../../snippet/get-all-public-snippets.js";

export const makeGetAllPublicSnippetsUseCase = ()=>{
    const snippetRepository = new PrismaSnippetRepository()

    return new GetAllPublicSnippetsUseCase(snippetRepository)
}