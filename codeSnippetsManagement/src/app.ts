import express from "express";
import { userRoutes } from "./routes/user.js";
import { snippetRoutes } from "./routes/snippet.js";
import { apiReference } from "@scalar/express-api-reference";

export const app = express();

app.use(express.json());
app.use(
  "/reference",
  apiReference({
    theme: "purple",
    url: "/openapi.json",
  }),
);

app.use(userRoutes);
app.use(snippetRoutes);
