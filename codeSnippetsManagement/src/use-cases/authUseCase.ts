import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { CreateUserRequestDto } from "../dto/user/create-user-dto";
import { AwsConfig } from "../lib/aws/awsConfig";
import { env } from "../env/env";
import crypto from "crypto";

export class AuthUseCase {
  constructor(private awsConfig: AwsConfig) {}

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

  private calculateSecretHash(username: string): string {
    const message = username + env.AWS_CLIENT_ID;
    const hmac = crypto.createHmac("sha256", env.AWS_CLIENT_SECRET!);
    hmac.update(message);
    return hmac.digest("base64");
  }
}
