import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { CreateSnippetUseCase } from "../../snippet/create-snippet.js";

export const makeCreateSnippet = () => {
  const snippetRepository = new PrismaSnippetRepository();
  const snippetUseCase = new CreateSnippetUseCase(snippetRepository);

  return snippetUseCase;
};
