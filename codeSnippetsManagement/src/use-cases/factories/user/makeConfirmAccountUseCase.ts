import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { AuthUseCase } from "../../authUseCase.js";
import { ConfirmAccountUseCase } from "../../user/confirm-account-useCase.js";

export const makeConfirmAccountUseCase = () => {
  const awsConfig = new AwsConfig();
  const authUseCase = new AuthUseCase(awsConfig);
  return new ConfirmAccountUseCase(authUseCase);
};
