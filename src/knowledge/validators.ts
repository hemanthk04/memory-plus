import { z } from "zod";

export const createKnowledgeSchema = z.object({
  content: z.string().min(1).max(10000),

  category: z.string().min(1),

  tags: z.array(z.string()).default([]),

  metadata: z.record(z.string(), z.unknown()).default({}),
});

export type CreateKnowledgeInput = z.infer<typeof createKnowledgeSchema>;