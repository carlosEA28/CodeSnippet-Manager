import { Router } from "express";
import { upload } from "../http/middlewares/multer.js";
import { createUser } from "../http/controllers/user/createUser.js";
import { confirmAccount } from "../http/controllers/user/confirmAccount.js";
import { login } from "../http/controllers/user/login.js";

export const userRoutes = Router();

userRoutes.post("/api/users", upload.single("avatar"), createUser);
userRoutes.post("/api/users/confirm", confirmAccount);
userRoutes.post("/api/users/login", login);
