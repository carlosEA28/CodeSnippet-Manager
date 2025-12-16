import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { AwsConfig } from "../lib/aws/awsConfig.js";
import { env } from "../env/env.js";

export class FileStorageUseCase {
  constructor(private awsConfig: AwsConfig) {}

  public async uploadFile(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<string> {
    const allowedTypes = "image/jpeg";
    const MAX_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5MB

    if (allowedTypes != file.mimetype) {
      throw new Error(
        "Invalid file type. Only JPEG, PNG, and PDF are allowed.",
      );
    }

    if (file.size > MAX_SIZE_IN_BYTES) {
      throw new Error("File is too large. Maximum size is 5MB.");
    }

    const command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
    });

    await this.awsConfig.s3Client().send(command);

    return `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: fileName,
    });

    await this.awsConfig.s3Client().send(command);
  }
}
