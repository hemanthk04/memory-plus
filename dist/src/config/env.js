import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
const candidates = [
    join(process.cwd(), ".env"),
    join(process.cwd(), "../.env"),
];
const envPath = candidates.find(existsSync);
if (envPath) {
    dotenv.config({ path: envPath });
}
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
