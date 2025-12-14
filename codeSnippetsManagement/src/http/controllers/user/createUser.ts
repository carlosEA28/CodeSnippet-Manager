import { CreateUserRequestDtoSchema } from "../../../dto/user/create-user-dto";
import type { Request, Response } from "express";
import { makeCreateUserUseCase } from "../../../use-cases/factories/user/makeCreateUserUseCase";

export async function createUser(request: Request, response: Response) {
  const avatar = request.file;

  const { email, password, username } =
    await CreateUserRequestDtoSchema.parseAsync(request.body);

  try {
    const createUserUseCase = makeCreateUserUseCase();
    const user = await createUserUseCase.execute({
      email,
      password,
      username,
      avatarFile: avatar,
    });
    response.status(201).send(user);
  } catch (error) {
    response.status(400).send({ error });
  }
}
