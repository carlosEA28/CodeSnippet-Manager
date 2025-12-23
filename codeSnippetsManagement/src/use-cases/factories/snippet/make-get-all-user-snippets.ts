import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { GetAllUserSnippetsUseCase } from "../../snippet/get-all-user-snippets.js";

export function makeGetAllUserSnippetsUseCase() {
  const snippetRepository = new PrismaSnippetRepository();
  const useCase = new GetAllUserSnippetsUseCase(snippetRepository);
  return useCase;
}
