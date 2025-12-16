import z from "zod";

export const OnboardingMailDto = z.object({
  email: z.email(),
  subject: z.string().min(1).max(100),
  body: z.string(),
});

export type OnboardingMailDto = z.infer<typeof OnboardingMailDto>;
