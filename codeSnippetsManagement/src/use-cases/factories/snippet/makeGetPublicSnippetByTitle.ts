import {PrismaSnippetRepository} from "../../../repositories/snippet/prisma-snippet-repository.js";
import {GetPublicSnippetsByTitleUseCase} from "../../snippet/get-public-snippet-by-title.js";

export const makeGetPublicSnippetByTitle = async () =>{
    const snippetsRepository = new PrismaSnippetRepository()
    return new GetPublicSnippetsByTitleUseCase(snippetsRepository)

}