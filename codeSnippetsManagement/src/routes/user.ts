import { Router } from "express";
import { upload } from "../http/middlewares/multer";
import { createUser } from "../http/controllers/user/createUser";
import { confirmAccount } from "../http/controllers/user/confirmAccount";

export const userRoutes = Router();

userRoutes.post("/api/users", upload.single("avatar"), createUser);
userRoutes.post("/api/users/confirm", confirmAccount);
