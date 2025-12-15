export function onboardingTemplate(actionUrl: string) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Bem-vindo</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:32px 16px">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden">
            <tr>
              <td style="background:#2563eb;padding:24px;text-align:center;color:#ffffff">
                <h1 style="margin:0;font-size:24px">Bem-vindo à nossa plataforma 🚀</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#374151">
                <p style="font-size:16px;line-height:1.6">Olá 👋</p>

                <p style="font-size:16px;line-height:1.6">
                  Seu cadastro foi realizado com sucesso. Agora você já pode acessar sua conta.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a href="${actionUrl}"
                        style="display:inline-block;background:#2563eb;color:#ffffff;
                        padding:14px 24px;border-radius:6px;text-decoration:none;font-weight:bold">
                        Acessar minha conta
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin-top:32px;font-size:14px;color:#6b7280">
                  Se você não criou essa conta, ignore este email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af">
                © 2025 Sua Empresa
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
