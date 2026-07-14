import { z } from "zod";
export const forgetSchema = z.object({
    query: z.string(),
});
