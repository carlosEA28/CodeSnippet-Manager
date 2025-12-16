import { AwsConfig } from "../../../lib/aws/awsConfig.js";
import { GetUserByEmail } from "../../../repositories/user/get-user-by-email.js";
import { AuthUseCase } from "../../authUseCase.js";
import { LoginUseCases } from "../../user/login-use-case.js";

export const makeLoginUseCase = () => {
  const awsConfig = new AwsConfig();
  const getUserByEmail = new GetUserByEmail();
  const authUseCase = new AuthUseCase(awsConfig, getUserByEmail);
  const loginUseCase = new LoginUseCases(getUserByEmail, authUseCase);

  return loginUseCase;
};
