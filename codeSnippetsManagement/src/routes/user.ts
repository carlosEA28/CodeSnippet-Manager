import { Router } from "express";
import { upload } from "../http/middlewares/multer";
import { createUser } from "../http/controllers/user/createUser";

export const userRoutes = Router();

userRoutes.post("/api/users", upload.single("avatar"), createUser);
