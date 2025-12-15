import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../../env/env.js";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { SESClient } from "@aws-sdk/client-ses";

export class AwsConfig {
  public s3Client(): S3Client {
    return new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  public cognitoClient(): CognitoIdentityProviderClient {
    const client = new CognitoIdentityProviderClient({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
    return client;
  }

  public sesClient(): SESClient {}
}
