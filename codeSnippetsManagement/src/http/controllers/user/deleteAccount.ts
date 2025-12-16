import { Request, Response } from "express";
import { DeleteAccountDto } from "../../../dto/user/deleteAccountDto.js";
import { makeDeleteUserAccountUseCase } from "../../../use-cases/factories/user/makeDeleteUserAccountUseCase.js";

export async function deleteAccount(req: Request, res: Response) {
  const { username, userId } = await DeleteAccountDto.parseAsync(req.body);

  const deleteUserAccountUseCase = makeDeleteUserAccountUseCase();

  try {
    await deleteUserAccountUseCase.execute({ username, userId });

    res.status(200).send({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete account" });
  }
}
