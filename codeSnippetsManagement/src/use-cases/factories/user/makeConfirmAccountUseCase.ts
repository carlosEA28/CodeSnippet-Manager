import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { AuthUseCase } from "../../authUseCase.js";
import { MailService } from "../../mailService.js";
import { ConfirmAccountUseCase } from "../../user/confirm-account-useCase.js";

export const makeConfirmAccountUseCase = () => {
  const awsConfig = new AwsConfig();
  const authUseCase = new AuthUseCase(awsConfig);
  const mailService = new MailService(awsConfig);

  return new ConfirmAccountUseCase(authUseCase, mailService);
};
