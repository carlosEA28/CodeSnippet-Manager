import { Request, Response } from "express";
import { makeGetAllUserPublicSnippetsUseCase } from "../../../use-cases/factories/snippet/make-get-all-user-public-snippets.js";
import { z } from "zod";

export async function getAllUserPublicSnippets(
  request: Request,
  response: Response,
) {
  const { userId } = request.body;

  const getAllUserPublicSnippetsUseCase = makeGetAllUserPublicSnippetsUseCase();

  const snippets = await getAllUserPublicSnippetsUseCase.execute(userId);

  return response.status(200).json(snippets);
}
