import { Request, Response } from "express";
import { makeGetAllUserSnippetsUseCase } from "../../../use-cases/factories/snippet/make-get-all-user-snippets.js";

export async function getAllUserSnippets(request: Request, response: Response) {
  const { userId } = request.body;

  const getAllUserSnippetsUseCase = makeGetAllUserSnippetsUseCase();

  const snippets = await getAllUserSnippetsUseCase.execute(userId);

  return response.status(200).json(snippets);
}
