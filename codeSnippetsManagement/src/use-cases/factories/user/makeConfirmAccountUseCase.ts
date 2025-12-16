import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { GetUserByEmail } from "../../../repositories/user/get-user-by-email.js";
import { PrismaUsersRepository } from "../../../repositories/user/prisma-users-repository.js";
import { AuthUseCase } from "../../authUseCase.js";
import { MailService } from "../../mailService.js";
import { ConfirmAccountUseCase } from "../../user/confirm-account-useCase.js";

export const makeConfirmAccountUseCase = () => {
  const awsConfig = new AwsConfig();
  const userRepository = new PrismaUsersRepository();
  const authUseCase = new AuthUseCase(awsConfig, userRepository);
  const mailService = new MailService(awsConfig);

  return new ConfirmAccountUseCase(authUseCase, mailService);
};
