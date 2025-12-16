import { Request, Response } from "express";
import { makeLoginUseCase } from "../../../use-cases/factories/user/makeLogin.js";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const loginUser = makeLoginUseCase();
    const token = await loginUser.execute(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
