import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { GetAllUserPublicSnippetsByTitleUseCase } from "../../snippet/get-all-user-public-snippets-by-title.js";

export function makeGetAllUserPublicSnippetsByTitleUseCase() {
    const snippetRepository = new PrismaSnippetRepository();
    const useCase = new GetAllUserPublicSnippetsByTitleUseCase(snippetRepository);
    return useCase;
}
