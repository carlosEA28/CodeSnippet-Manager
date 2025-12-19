import { Router } from "express";
import { authMiddleware } from "../http/middlewares/auth.js";
import { createSnippet } from "../http/controllers/snippet/create-snippet.js";
import { deleteSnippet } from "../http/controllers/snippet/delete-snippet.js";

export const snippetRoutes = Router();

snippetRoutes.post("/api/snippets", authMiddleware, createSnippet);
snippetRoutes.delete("/api/snippets/:id", authMiddleware, deleteSnippet);
