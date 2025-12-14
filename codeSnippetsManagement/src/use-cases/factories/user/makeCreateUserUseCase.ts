import { AwsConfig } from "../../../lib/aws/awsConfig";
import { CreateUserRepository } from "../../../repositories/user/create-user-repository";
import { GetUserByEmail } from "../../../repositories/user/get-user-by-email";
import { GetUserByUsername } from "../../../repositories/user/get-user-by-username";
import { AuthUseCase } from "../../authUseCase";
import { FileStorageUseCase } from "../../FileStorageUseCase";
import { CreateUserUseCase } from "../../user/create-user-useCase";

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
