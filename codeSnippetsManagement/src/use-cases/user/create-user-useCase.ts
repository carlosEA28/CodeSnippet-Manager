import { CreateUserRequestDto } from "../../dto/user/create-user-dto.js";
import { UserRepository } from "../../repositories/user-repository.js";
import { AuthUseCase } from "../authUseCase.js";
import { FileStorageUseCase } from "../FileStorageUseCase.js";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private signUpCognito: AuthUseCase,
    private storageFileUseCase: FileStorageUseCase,
  ) {}
  async execute(createUserRequestDto: CreateUserRequestDto) {
    const { email, username, avatarFile } = createUserRequestDto;

    const existingUserByEmail = await this.userRepository.getUserByEmail(email);
    const existingUserByUsername =
      await this.userRepository.getUserByUsername(username);

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

    const user = await this.userRepository.createUser({
      id: userId,
      email,
      username,
      avatarUrl: avatar,
    });

    return user;
  }
}
