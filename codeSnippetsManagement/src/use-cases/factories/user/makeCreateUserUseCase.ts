import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { CreateUserRepository } from "../../../repositories/user/create-user-repository.js";
import { GetUserByEmail } from "../../../repositories/user/get-user-by-email.js";
import { GetUserByUsername } from "../../../repositories/user/get-user-by-username.js";
import { PrismaUsersRepository } from "../../../repositories/user/prisma-users-repository.js";
import { AuthUseCase } from "../../authUseCase.js";
import { FileStorageUseCase } from "../../FileStorageUseCase.js";
import { CreateUserUseCase } from "../../user/create-user-useCase.js";

export function makeCreateUserUseCase() {
  const awsConfig = new AwsConfig();
  const userRepository = new PrismaUsersRepository();
  const signUpCognito = new AuthUseCase(awsConfig, userRepository);
  const fileStorage = new FileStorageUseCase(awsConfig);

  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    signUpCognito,
    fileStorage,
  );

  return createUserUseCase;
}
