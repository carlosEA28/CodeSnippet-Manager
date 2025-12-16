import { DeleteAccountDto } from "../../dto/user/deleteAccountDto.js";
import { AwsConfig } from "../../lib/aws/awsConfig.js";
import { DeleteUserByIdRepository } from "../../repositories/user/delete-user-repository.js";
import { GetUserbyIdRepostiory } from "../../repositories/user/get-user-by-id-repositoryy.js";
import { AuthUseCase } from "../authUseCase.js";
import { FileStorageUseCase } from "../FileStorageUseCase.js";

export class DeleteAccountUseCase {
  constructor(
    private getUserById: GetUserbyIdRepostiory,
    private deleteUserById: DeleteUserByIdRepository,
    private fileStorageUseCase: FileStorageUseCase,
    private authService: AuthUseCase,
  ) {}
  async execute(deleteAccountDto: DeleteAccountDto) {
    const user = await this.getUserById.execute(deleteAccountDto.userId);

    if (!user) {
      throw new Error("User not found");
    }

    await this.deleteUserById.execute(user.id);
    await this.fileStorageUseCase.deleteFile(user.id);
    await this.authService.deleteCognitoAccount(user.email);

    return { message: "Account deleted successfully" };
  }
}
