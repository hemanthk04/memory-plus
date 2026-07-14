import "dotenv/config";

import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string(),

    PORT: z.coerce.number().default(3000),

    OPENAI_API_KEY: z.string(),

    EMBEDDING_PROVIDER: z.enum(["openai"]),

    OPENAI_EMBEDDING_MODEL: z.string(),

    DEFAULT_RECALL_LIMIT: z.coerce.number().default(5),

    DEFAULT_RECALL_THRESHOLD: z.coerce.number().default(0.65),

    MEMORY_UPDATE_THRESHOLD: z.coerce.number().default(0.45),

    MEMORY_FORGET_THRESHOLD: z.coerce.number().default(0.65),
  })
  .parse(process.env);
