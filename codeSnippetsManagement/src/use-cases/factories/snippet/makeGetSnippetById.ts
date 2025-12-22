import {PrismaSnippetRepository} from "../../../repositories/snippet/prisma-snippet-repository.js";
import {GetPublicSnippetsByTitleUseCase} from "../../snippet/get-public-snippet-by-title.js";
import {GetSnippetsByTagUseCase} from "../../snippet/get-snippets-by-tag.js";
import {GetSnippetsByLanguageUseCase} from "../../snippet/get-snippets-by-language.js";
import {GetSnippetByIdUseCase} from "../../snippet/get-snippet-by-id.js";

export const makeGetSnippetById = async () =>{
    const snippetsRepository = new PrismaSnippetRepository()
    return new GetSnippetByIdUseCase(snippetsRepository)

}