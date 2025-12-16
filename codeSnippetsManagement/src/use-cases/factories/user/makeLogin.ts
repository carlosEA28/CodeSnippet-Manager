import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { AuthUseCase } from "../../authUseCase.js";
import { LoginUseCases } from "../../user/login-use-case.js";
import { UserRepository } from "../../../repositories/user-repository.js";
import { PrismaUsersRepository } from "../../../repositories/user/prisma-users-repository.js";

export const makeLoginUseCase = () => {
  const awsConfig = new AwsConfig();
  const userRepository = new PrismaUsersRepository();
  const authUseCase = new AuthUseCase(awsConfig, userRepository);
  const loginUseCase = new LoginUseCases(userRepository, authUseCase);

  return loginUseCase;
};
