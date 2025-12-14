import z from "zod";

export const ConfirmAccountDtoSchema = z.object({
  code: z.string(),
  username: z.string(),
});

export type ConfirmAccountDto = z.infer<typeof ConfirmAccountDtoSchema>;
