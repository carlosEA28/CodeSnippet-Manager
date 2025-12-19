import { Request, Response } from "express";
import { CreateSnippetRequestDto } from "../../../dto/snippet/CreateSnippetRequestDto.js";
import { PrismaSnippetRepository } from "../../../repositories/snippet/prisma-snippet-repository.js";
import { makeCreateSnippet } from "../../../use-cases/factories/snippet/makeCreateSnippet.js";

export async function createSnippet(req: Request, res: Response) {
  const {
    title,
    description,
    isPublic,
    tagsId,
    collectionId,
    userId,
    code,
    language,
  } = await CreateSnippetRequestDto.parseAsync(req.body);

  const snippetUseCase = makeCreateSnippet();

  try {
    const snippet = await snippetUseCase.execute({
      title,
      description,
      isPublic,
      tagsId,
      collectionId,
      userId,
      code,
      language,
    });

    return res.status(201).json(snippet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
