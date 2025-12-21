import {PrismaSnippetRepository} from "../../../repositories/snippet/prisma-snippet-repository.js";
import {GetAllSnippetsUseCase} from "../../snippet/get-all-snippets.js";

export const makeGetAllSnippetsUseCase = async () => {
    const snippetRepository = new PrismaSnippetRepository()

    return new GetAllSnippetsUseCase(snippetRepository)
}