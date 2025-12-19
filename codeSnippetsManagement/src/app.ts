import express from "express";
import { userRoutes } from "./routes/user.js";
import { snippetRoutes } from "./routes/snippet.js";

export const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(snippetRoutes);
