import { Router } from "express";
import { authMiddleware } from "../http/middlewares/auth.js";
import { createSnippet } from "../http/controllers/snippet/create-snippet.js";

export const snippetRoutes = Router();

snippetRoutes.post("/api/snippets", authMiddleware, createSnippet);
