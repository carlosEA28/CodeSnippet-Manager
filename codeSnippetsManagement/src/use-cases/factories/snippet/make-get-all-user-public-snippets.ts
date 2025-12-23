import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { GetAllUserPublicSnippetsUseCase } from "../../snippet/get-all-user-public-snippets.js";

export function makeGetAllUserPublicSnippetsUseCase() {
  const snippetRepository = new PrismaSnippetRepository();
  const useCase = new GetAllUserPublicSnippetsUseCase(snippetRepository);
  return useCase;
}
