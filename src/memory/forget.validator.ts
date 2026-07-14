import { z } from "zod";

export const forgetSchema = z.object({
  query: z.string(),
});

export type ForgetInput = z.infer<typeof forgetSchema>;
