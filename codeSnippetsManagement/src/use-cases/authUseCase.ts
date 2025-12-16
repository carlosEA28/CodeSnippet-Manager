import {
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CreateUserRequestDto } from "../dto/user/create-user-dto.js";
import { AwsConfig } from "../lib/aws/awsConfig.js";
import { env } from "../env/env.js";
import crypto from "crypto";
import { ConfirmAccountDto } from "../dto/user/confirmAccountDto.js";
import { GetUserByEmail } from "../repositories/user/get-user-by-email.js";

export class AuthUseCase {
  constructor(
    private awsConfig: AwsConfig,
    private getUserByEmail: GetUserByEmail,
  ) {}

  public async signUpCognito(createUserRequestDto: CreateUserRequestDto) {
    const command = new SignUpCommand({
      ClientId: env.AWS_CLIENT_ID,
      Username: createUserRequestDto.email,
      Password: createUserRequestDto.password,
      SecretHash: this.calculateSecretHash(createUserRequestDto.email),
    });

    try {
      const response = await this.awsConfig.cognitoClient().send(command);
      return response;
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }

  public async confirmAccount({ code, username }: ConfirmAccountDto) {
    const command = new ConfirmSignUpCommand({
      ClientId: env.AWS_CLIENT_ID,
      Username: username,
      SecretHash: this.calculateSecretHash(username),
      ConfirmationCode: code,
    });

    const response = await this.awsConfig.cognitoClient().send(command);

    if (response.$metadata.httpStatusCode === 200) {
      return {
        token: response.Session,
      };
    }

    throw new Error("Failed to confirm account");
  }

  public async login(email: string, password: string) {
    const user = await this.getUserByEmail.execute(email);

    if (!user) {
      throw new Error("User not found");
    }

    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: env.AWS_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.calculateSecretHash(email),
      },
    });

    const response = await this.awsConfig.cognitoClient().send(command);

    if (response.$metadata.httpStatusCode === 200) {
      return {
        token: response.AuthenticationResult?.AccessToken,
      };
    }

    throw new Error("Failed to login");
  }

  private calculateSecretHash(username: string): string {
    const message = username + env.AWS_CLIENT_ID;
    const hmac = crypto.createHmac("sha256", env.AWS_CLIENT_SECRET!);
    hmac.update(message);
    return hmac.digest("base64");
  }
}
