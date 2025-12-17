import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUserRepository } from "../../../repositories/in-memory/in-memory-user-repository.js";
import { CreateUserUseCase } from "../create-user-useCase.js";
import { AuthUseCase } from "../../authUseCase.js";
import { FileStorageUseCase } from "../../FileStorageUseCase.js";

describe("Create User Use Case", () => {
  let signupCognito: AuthUseCase;
  let fileStorageUseCase: FileStorageUseCase;
  let userRepository: InMemoryUserRepository;
  let sut: CreateUserUseCase;

  const mockFile: Express.Multer.File = {
    fieldname: "avatar",
    originalname: "avatar.jpg",
    encoding: "7bit",
    mimetype: "image/jpeg",
    buffer: Buffer.from("fake-image-content"),
    size: 1024,
    destination: "",
    filename: "",
    path: "",
    stream: null as any,
  };

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    signupCognito = {
      signUpCognito: vi.fn().mockResolvedValue({
        UserSub: "cognito-123",
      }),
    } as any;

    fileStorageUseCase = {
      uploadFile: vi.fn().mockResolvedValue({
        url: "https://storage.com/avatar.jpg",
        key: "testuser-avatar.jpg",
      }),
    } as any;

    sut = new CreateUserUseCase(
      userRepository,
      signupCognito,
      fileStorageUseCase,
    );
  });

  it("should not create a user if email already exists", async () => {
    await sut.execute({
      username: "testuser",
      email: "test@example.com",
      password: "password",
      avatarFile: mockFile,
    });

    await expect(
      sut.execute({
        username: "anotheruser",
        email: "test@example.com",
        password: "password",
        avatarFile: mockFile,
      }),
    ).rejects.toThrow("Email already exists");
  });

  it("should not create a user if username already exists", async () => {
    await sut.execute({
      username: "testuser",
      email: "test@example.com",
      password: "password",
      avatarFile: mockFile,
    });

    await expect(
      sut.execute({
        username: "testuser",
        email: "another@example.com",
        password: "password",
        avatarFile: mockFile,
      }),
    ).rejects.toThrow("Username already exists");
  });

  it("should create a user", async () => {
    const user = await sut.execute({
      id: "cognito-123",
      username: "testuser",
      email: "test@example.com",
      password: "password",
      avatarFile: mockFile,
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
