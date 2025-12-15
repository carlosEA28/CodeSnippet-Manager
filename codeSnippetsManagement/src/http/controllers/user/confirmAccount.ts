import { Request, Response } from "express";
import { ConfirmAccountDtoSchema } from "../../../dto/user/confirmAccountDto.js";
import { makeConfirmAccountUseCase } from "../../../use-cases/factories/user/makeConfirmAccountUseCase.js";

export async function confirmAccount(request: Request, response: Response) {
  const { code, username } = ConfirmAccountDtoSchema.parse(request.body);

  try {
    const confirmAccount = makeConfirmAccountUseCase();
    const token = await confirmAccount.execute({ code, username });
    response.status(200).json({ token });
  } catch (error) {
    response.status(400).json({ error });
  }
}
