import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { DeleteSnippetUseCase } from "../../snippet/delete-snippet.js";

export const makeDeleteSnippetUseCase = () => {
  const snippetRepository = new PrismaSnippetRepository();
  const deleteSnippetUseCase = new DeleteSnippetUseCase(snippetRepository);
  return deleteSnippetUseCase;
};
