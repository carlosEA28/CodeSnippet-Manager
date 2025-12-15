import { ConfirmAccountDto } from "../../dto/user/confirmAccountDto.js";
import { onboardingTemplate } from "../../templates/onboarding-email.js";
import { AuthUseCase } from "../authUseCase.js";
import { MailService } from "../mailService.js";

export class ConfirmAccountUseCase {
  constructor(
    private authUseCase: AuthUseCase,
    private mailService: MailService,
  ) {}
  async execute({ code, username }: ConfirmAccountDto) {
    const response = await this.authUseCase.confirmAccount({ code, username });

    if (!response) {
      throw new Error("Failed to confirm account");
    }

    await this.mailService.execute({
      email: username,
      subject: "Account confirmed",
    });

    return response.token;
  }
}
