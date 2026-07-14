import { z } from "zod";
export const recallSchema = z.object({
    query: z.string().min(1),
    limit: z.number().min(1).max(20).default(5),
});
