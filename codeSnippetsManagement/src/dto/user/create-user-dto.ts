import z from "zod";

export const CreateUserRequestDtoSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(1, { message: "O nome de usuário é obrigatório" }),
  email: z
    .email({ message: "O email deve ser válido" })
    .min(1, { message: "O email é obrigatório" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
      },
    ),
});

export type CreateUserRequestDto = z.infer<
  typeof CreateUserRequestDtoSchema
> & {
  avatarFile?: Express.Multer.File;
};
