import {PrismaSnippetRepository} from "../../../repositories/snippet/prisma-snippet-repository.js";
import {GetPublicSnippetsByTitleUseCase} from "../../snippet/get-public-snippet-by-title.js";
import {GetSnippetsByTagUseCase} from "../../snippet/get-snippets-by-tag.js";

export const makeGetPublicSnippetByTag = async () =>{
    const snippetsRepository = new PrismaSnippetRepository()
    return new GetSnippetsByTagUseCase(snippetsRepository)

}