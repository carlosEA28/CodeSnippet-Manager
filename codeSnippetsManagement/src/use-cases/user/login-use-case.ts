import { AwsConfig } from "../../lib/aws/awsConfig.js";
import { GetUserByEmail } from "../../repositories/user/get-user-by-email.js";
import { AuthUseCase } from "../authUseCase.js";

export class LoginUseCases {
  constructor(
    private getUserByEmail: GetUserByEmail,
    private authUseCase: AuthUseCase,
  ) {}

  // LoginUseCases
  async execute(email: string, password: string) {
    const user = await this.getUserByEmail.execute(email);
    if (!user) {
      throw new Error("Incorrect username or password.");
    }
    const token = await this.authUseCase.login(email, password);
    return { token: token.token };
  }
}
