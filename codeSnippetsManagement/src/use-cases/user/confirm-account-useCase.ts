import { channels } from "../../broker/channels/index";
import { user } from "../../broker/channels/user";
import { ConfirmAccountDto } from "../../dto/user/confirmAccountDto";
import { AuthUseCase } from "../authUseCase";

export class ConfirmAccountUseCase {
  constructor(private authUseCase: AuthUseCase) {}
  async execute({ code, username }: ConfirmAccountDto) {
    const response = await this.authUseCase.confirmAccount({ code, username });

    if (!response) {
      throw new Error("Failed to confirm account");
    }

    channels.user.sendToQueue(
      "user",
      Buffer.from(JSON.stringify({ email: username })),
    );

    return response.token;
  }
}
