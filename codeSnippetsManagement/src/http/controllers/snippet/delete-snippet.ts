import { Request, Response } from "express";
import { makeDeleteSnippetUseCase } from "../../../use-cases/factories/snippet/makeDeleteSnippet.js";

export async function deleteSnippet(req: Request, res: Response) {
  const deleteSnippetUseCase = makeDeleteSnippetUseCase();
  const { id } = req.params;

  try {
    await deleteSnippetUseCase.execute(id);
    res.status(204).send({ message: "Snippet deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
