import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { CreateUserRepository } from "../../../repositories/user/create-user-repository.js";
import { GetUserByEmail } from "../../../repositories/user/get-user-by-email.js";
import { GetUserByUsername } from "../../../repositories/user/get-user-by-username.js";
import { AuthUseCase } from "../../authUseCase.js";
import { FileStorageUseCase } from "../../FileStorageUseCase.js";
import { CreateUserUseCase } from "../../user/create-user-useCase.js";

export function makeCreateUserUseCase() {
  const createUserRepository = new CreateUserRepository();
  const awsConfig = new AwsConfig();
  const signUpCognito = new AuthUseCase(awsConfig);
  const getUserByEmail = new GetUserByEmail();
  const getUserByUsername = new GetUserByUsername();
  const fileStorage = new FileStorageUseCase(awsConfig);

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    signUpCognito,
    getUserByEmail,
    getUserByUsername,
    fileStorage,
  );

  return createUserUseCase;
}
