import { ConfirmAccountDto } from "../../dto/user/confirmAccountDto.js";
import { AuthUseCase } from "../authUseCase.js";

export class ConfirmAccountUseCase {
  constructor(private authUseCase: AuthUseCase) {}
  async execute({ code, username }: ConfirmAccountDto) {
    const response = await this.authUseCase.confirmAccount({ code, username });

    if (!response) {
      throw new Error("Failed to confirm account");
    }

    return response.token;
  }
}
