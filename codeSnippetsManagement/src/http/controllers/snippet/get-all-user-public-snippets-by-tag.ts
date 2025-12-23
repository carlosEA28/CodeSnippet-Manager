import { Request, Response } from "express";
import { makeGetAllUserPublicSnippetsByTagUseCase } from "../../../use-cases/factories/snippet/make-get-all-user-public-snippets-by-tag.js";

export async function getAllUserPublicSnippetsByTag(
  request: Request,
  response: Response,
) {
  const { userId, tag } = request.body;

  const getAllUserPublicSnippetsByTagUseCase =
    makeGetAllUserPublicSnippetsByTagUseCase();

  const snippets = await getAllUserPublicSnippetsByTagUseCase.execute(
    userId,
    tag,
  );

  return response.status(200).json(snippets);
}
