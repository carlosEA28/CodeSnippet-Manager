import { SendEmailCommand } from "@aws-sdk/client-ses";
import { OnboardingMailDto } from "../dto/mail/onboarding-mail-dto.js";
import { AwsConfig } from "../lib/aws/awsConfig.js";
import { onboardingTemplate } from "../templates/onboarding-email.js";

export class MailService {
  constructor(private awsConfig: AwsConfig) {}

  async execute(props: OnboardingMailDto) {
    const params = {
      Destination: {
        ToAddresses: [props.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: props.body, // ← Use props.body em vez de chamar o template aqui
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: props.subject,
        },
      },
      Source: "cead2811@gmail.com",
    };

    try {
      const command = new SendEmailCommand(params);
      await this.awsConfig.sesClient().send(command);
      return { message: "Email sent successfully" };
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
