import { CreateUserRequestDto } from "../../dto/user/create-user-dto.js";
import { env } from "../../env/env.js";
import { hashPassword } from "../../helpers/hashPassword.js";
import { CreateUserRepository } from "../../repositories/user/create-user-repository.js";
import { GetUserByEmail } from "../../repositories/user/get-user-by-email.js";
import { GetUserByUsername } from "../../repositories/user/get-user-by-username.js";
import { AuthUseCase } from "../authUseCase.js";
import { FileStorageUseCase } from "../FileStorageUseCase.js";

export class CreateUserUseCase {
  constructor(
    private createUserRepository: CreateUserRepository,
    private signUpCognito: AuthUseCase,
    private getUserByEmail: GetUserByEmail,
    private getUserByUsername: GetUserByUsername,
    private storageFileUseCase: FileStorageUseCase,
  ) {}
  async execute(createUserRequestDto: CreateUserRequestDto) {
    const { email, username, avatarFile } = createUserRequestDto;

    const existingUserByEmail = await this.getUserByEmail.execute(email);
    const existingUserByUsername =
      await this.getUserByUsername.execute(username);

    if (existingUserByEmail) throw new Error("Email already exists"); //criar error custom
    if (existingUserByUsername) throw new Error("Username already exists"); //criar error custom

    var avatar = await this.storageFileUseCase.uploadFile(
      avatarFile!,
      username + "avatarUrl",
    );

    const response = await this.signUpCognito.signUpCognito({
      email,
      username,
      password: createUserRequestDto.password,
    });

    const userId = response.UserSub;

    if (!userId) {
      throw new Error("Failed to get user ID from Cognito");
    }

    const user = await this.createUserRepository.execute({
      id: userId,
      email,
      username,
      avatarUrl: avatar,
    });

    return user;
  }
}
