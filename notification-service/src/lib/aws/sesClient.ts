import dotenv from 'dotenv'
dotenv.config()


import {SendEmailCommand, SESClient, VerifyEmailIdentityCommand} from "@aws-sdk/client-ses";

interface SendEmailInput {
    to: string;
    subject: string;
    html: string;
}

export class SESService{
    private client: SESClient;

    constructor() {
        this.client = new SESClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY!,
                secretAccessKey: process.env.AWS_SECRET_KEY!,
            },
        });
    }

    //para dev
    async verifyEmail(email: string): Promise<void> {
        const command = new VerifyEmailIdentityCommand({
            EmailAddress: email,
        });

        await this.client.send(command);
    }


    async sendEmail({to,html,subject}:SendEmailInput){
        const command = new SendEmailCommand({
            Source:  process.env.SES_FROM_EMAIL!,
            Destination:{
                ToAddresses:[to]
            },
            Message:{
              Subject:{
                  Data:subject,
                  Charset:"UTF-8"
              },
                Body:{
                  Html:{
                      Data:html,
                      Charset:"UTF-8"
                  }
                }
            }
        })

        await this.client.send(command)
    }
}