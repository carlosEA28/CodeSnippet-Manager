import z from "zod";

export const CreateSnippetRequestDto = z.object({
  title: z.string().min(1, { error: "Titulo obrigatório" }),
  description: z.string().min(1).max(200).optional(),
  code: z.string().min(1, { error: "Snippet obrigatório" }),
  language: z.string().min(1, { error: "Linguagem obrigatória" }),
  tagsId: z.array(z.string().min(1)).optional(),
  isPublic: z.boolean(),
  collectionId: z.string().optional(),
  userId: z.string(),
});

export type CreateSnippetRequestDto = z.infer<typeof CreateSnippetRequestDto>;
