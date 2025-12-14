import z from "zod";

const _env = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_CLIENT_ID: z.string(),
  AWS_CLIENT_SECRET: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_COGNITO_ISSUER_URL: z.string(),
  AWS_COGNIT_USER_POOL_ID: z.string(),
  DATABASE_URL: z.string(),
});

export const env = _env.parse(process.env);
