import { Request, Response } from "express";
import { makeGetAllUserPublicSnippetsByLanguageUseCase } from "../../../use-cases/factories/snippet/make-get-all-user-public-snippets-by-language.js";

export async function getAllUserPublicSnippetsByLanguage(
  request: Request,
  response: Response,
) {
  const { userId, language } = request.body;

  const getAllUserPublicSnippetsByLanguageUseCase =
    makeGetAllUserPublicSnippetsByLanguageUseCase();

  const snippets = await getAllUserPublicSnippetsByLanguageUseCase.execute(
    userId,
    language,
  );

  return response.status(200).json(snippets);
}
