import { AwsConfig } from "../../../lib/aws/awsConfig";
import { AuthUseCase } from "../../authUseCase";
import { ConfirmAccountUseCase } from "../../user/confirm-account-useCase";

export const makeConfirmAccountUseCase = () => {
  const awsConfig = new AwsConfig();
  const authUseCase = new AuthUseCase(awsConfig);
  return new ConfirmAccountUseCase(authUseCase);
};
