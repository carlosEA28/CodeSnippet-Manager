import {PrismaSnippetRepository} from "../../../repositories/snippet/prisma-snippet-repository.js";
import {GetPublicSnippetsByTitleUseCase} from "../../snippet/get-public-snippet-by-title.js";
import {GetSnippetsByTagUseCase} from "../../snippet/get-snippets-by-tag.js";
import {GetSnippetsByLanguageUseCase} from "../../snippet/get-snippets-by-language.js";

export const makeGetPublicSnippetByLanguage = async () =>{
    const snippetsRepository = new PrismaSnippetRepository()
    return new GetSnippetsByLanguageUseCase(snippetsRepository)

}