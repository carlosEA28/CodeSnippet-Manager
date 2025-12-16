import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { DeleteUserByIdRepository } from "../../../repositories/user/delete-user-repository.js";
import { GetUserByEmail } from "../../../repositories/user/get-user-by-email.js";
import { GetUserbyIdRepostiory } from "../../../repositories/user/get-user-by-id-repositoryy.js";
import { AuthUseCase } from "../../authUseCase.js";
import { FileStorageUseCase } from "../../FileStorageUseCase.js";
import { DeleteAccountUseCase } from "../../user/delete-account-useCase.js";

export const makeDeleteUserAccountUseCase = () => {
  const getUserById = new GetUserbyIdRepostiory();
  const deleteUserById = new DeleteUserByIdRepository();
  const awsConfig = new AwsConfig();
  const fileStorageUseCase = new FileStorageUseCase(awsConfig);
  const getUserByEmail = new GetUserByEmail();
  const authService = new AuthUseCase(awsConfig, getUserByEmail);

  return new DeleteAccountUseCase(
    getUserById,
    deleteUserById,
    fileStorageUseCase,
    authService,
  );
};
