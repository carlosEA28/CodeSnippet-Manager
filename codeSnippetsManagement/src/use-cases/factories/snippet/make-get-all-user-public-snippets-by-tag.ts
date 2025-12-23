import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { GetAllUserPublicSnippetsByTagUseCase } from "../../snippet/get-all-user-public-snippets-by-tag.js";

export function makeGetAllUserPublicSnippetsByTagUseCase() {
    const snippetRepository = new PrismaSnippetRepository();
    const useCase = new GetAllUserPublicSnippetsByTagUseCase(snippetRepository);
    return useCase;
}
