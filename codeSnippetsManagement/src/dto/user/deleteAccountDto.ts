import z from "zod";

export const DeleteAccountDto = z.object({
  userId: z.string(),
  username: z.string(),
});

export type DeleteAccountDto = z.infer<typeof DeleteAccountDto>;
