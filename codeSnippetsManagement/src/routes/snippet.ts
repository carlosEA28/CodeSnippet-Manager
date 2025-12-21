import { Router } from "express";
import { authMiddleware } from "../http/middlewares/auth.js";
import { createSnippet } from "../http/controllers/snippet/create-snippet.js";
import { deleteSnippet } from "../http/controllers/snippet/delete-snippet.js";
import {getAllSnippets} from "../http/controllers/snippet/get-all-snippets.js";
import {getAllPublicSnippets} from "../http/controllers/snippet/get-all-public-snippets.js";
import {getAllPublicSnippetsByTitle} from "../http/controllers/snippet/get-all-public-snippets-by-title.js";

export const snippetRoutes = Router();

snippetRoutes.get("/api/snippets", authMiddleware,getAllSnippets);
snippetRoutes.get("/api/snippets/public",authMiddleware,getAllPublicSnippets)
snippetRoutes.get("/api/snippets/search", authMiddleware, getAllPublicSnippetsByTitle);
snippetRoutes.post("/api/snippets", authMiddleware, createSnippet);
snippetRoutes.delete("/api/snippets/:id", authMiddleware, deleteSnippet);
