import { sesService } from "../lib/aws";

export async function sendWelcomeEmail(email: string) {
    await sesService.sendEmail({
        to: email,
        subject: "Bem-vindo!",
        html: "<h1>Conta criada com sucesso</h1>",
    });
}
