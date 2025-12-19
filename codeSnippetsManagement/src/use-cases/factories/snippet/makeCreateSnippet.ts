import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { PrismaTagRepository } from "../../../repositories/tag/prisma-tag-repository.js";
import { CreateSnippetUseCase } from "../../snippet/create-snippet.js";

export const makeCreateSnippet = () => {
  const snippetRepository = new PrismaSnippetRepository();
  const tagRepository = new PrismaTagRepository();
  const snippetUseCase = new CreateSnippetUseCase(
    snippetRepository,
    tagRepository,
  );

  return snippetUseCase;
};
