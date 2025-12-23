import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { GetAllUserPublicSnippetsByLanguageUseCase } from "../../snippet/get-all-user-public-snippets-by-language.js";

export function makeGetAllUserPublicSnippetsByLanguageUseCase() {
    const snippetRepository = new PrismaSnippetRepository();
    const useCase = new GetAllUserPublicSnippetsByLanguageUseCase(snippetRepository);
    return useCase;
}
