import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { DeleteUserByIdRepository } from "../../../repositories/user/delete-user-repository.js";
import { GetUserByEmail } from "../../../repositories/user/get-user-by-email.js";
import { GetUserbyIdRepostiory } from "../../../repositories/user/get-user-by-id-repositoryy.js";
import { PrismaUsersRepository } from "../../../repositories/user/prisma-users-repository.js";
import { AuthUseCase } from "../../authUseCase.js";
import { FileStorageUseCase } from "../../FileStorageUseCase.js";
import { DeleteAccountUseCase } from "../../user/delete-account-useCase.js";

export const makeDeleteUserAccountUseCase = () => {
  const userRepository = new PrismaUsersRepository();
  const awsConfig = new AwsConfig();
  const fileStorageUseCase = new FileStorageUseCase(awsConfig);
  const authService = new AuthUseCase(awsConfig, userRepository);

  return new DeleteAccountUseCase(
    userRepository,
    fileStorageUseCase,
    authService,
  );
};
