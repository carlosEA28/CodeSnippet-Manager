import express from "express";
import { userRoutes } from "./routes/user.js";

export const app = express();

app.use(express.json());
app.use(userRoutes);
