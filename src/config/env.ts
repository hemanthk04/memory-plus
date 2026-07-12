import "dotenv/config";

import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string(),

    PORT: z.coerce.number().default(3000),

    OPENAI_API_KEY: z.string(),

    EMBEDDING_PROVIDER: z.enum(["openai"]),

    OPENAI_EMBEDDING_MODEL: z.string(),
  })
  .parse(process.env);