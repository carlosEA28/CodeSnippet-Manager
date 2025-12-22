import { Router } from "express";
import { authMiddleware } from "../http/middlewares/auth.js";
import { createSnippet } from "../http/controllers/snippet/create-snippet.js";
import { deleteSnippet } from "../http/controllers/snippet/delete-snippet.js";
import {getAllSnippets} from "../http/controllers/snippet/get-all-snippets.js";
// import {getAllPublicSnippets} from "../http/controllers/snippet/get-all-public-snippets.js";
import {getAllPublicSnippetsByTitle} from "../http/controllers/snippet/get-all-public-snippets-by-title.js";
import { getSnippetById} from "../http/controllers/snippet/get-snippet-by-id.js";
import {getAllPublicSnippetsByTag} from "../http/controllers/snippet/get-all-public-snippets-by-tag.js";
import {getPublicRecentSnippets} from "../http/controllers/snippet/get-public-recent-snippets.js";
import {getAllPublicSnippetsByLanguage} from "../http/controllers/snippet/get-all-public-snippets-by-language.js";

export const snippetRoutes = Router();



// 1. Rotas com paths fixos (mais específicas)
snippetRoutes.get("/api/snippets/search", authMiddleware, getAllPublicSnippetsByTitle);
snippetRoutes.get("/api/snippets/recent", authMiddleware, getPublicRecentSnippets);
snippetRoutes.get("/api/snippets/public", authMiddleware, getAllSnippets);

// 2. Rotas com prefixos específicos + parâmetros
snippetRoutes.get("/api/snippets/language/:language", authMiddleware, getAllPublicSnippetsByLanguage);
snippetRoutes.get("/api/snippets/tag/:tag", authMiddleware, getAllPublicSnippetsByTag);

// 3. Rota base sem parâmetros
snippetRoutes.get("/api/snippets", authMiddleware, getAllSnippets);

// 4. Rota com parâmetro genérico (SEMPRE POR ÚLTIMO!)
snippetRoutes.get("/api/snippets/:id", authMiddleware, getSnippetById);
snippetRoutes.post("/api/snippets", authMiddleware, createSnippet);
snippetRoutes.delete("/api/snippets/:id", authMiddleware, deleteSnippet);
