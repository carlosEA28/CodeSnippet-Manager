import { Request, Response } from "express";
import { makeGetAllUserPublicSnippetsByTitleUseCase } from "../../../use-cases/factories/snippet/make-get-all-user-public-snippets-by-title.js";

export async function getAllUserPublicSnippetsByTitle(
  request: Request,
  response: Response,
) {
  const { userId, title } = request.body;

  const getAllUserPublicSnippetsByTitleUseCase =
    makeGetAllUserPublicSnippetsByTitleUseCase();

  const snippets = await getAllUserPublicSnippetsByTitleUseCase.execute(
    userId,
    title,
  );

  return response.status(200).json(snippets);
}
