import { CreateUserRequestDto } from "../../dto/user/create-user-dto";
import { env } from "../../env/env";
import { hashPassword } from "../../helpers/hashPassword";
import { CreateUserRepository } from "../../repositories/user/create-user-repository";
import { GetUserByEmail } from "../../repositories/user/get-user-by-email";
import { GetUserByUsername } from "../../repositories/user/get-user-by-username";
import { AuthUseCase } from "../authUseCase";
import { FileStorageUseCase } from "../FileStorageUseCase";

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

    const hashedPassword = await hashPassword(createUserRequestDto.password);

    const response = await this.signUpCognito.signUpCognito({
      email,
      username,
      password: hashedPassword,
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
