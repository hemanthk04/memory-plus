import { env } from "../../config/env.js";

import { OpenAIEmbeddingProvider } from "./openai.js";
import type { EmbeddingProvider } from "./types.js";

export function createEmbeddingProvider(): EmbeddingProvider {
  switch (env.EMBEDDING_PROVIDER) {
    case "openai":
      return new OpenAIEmbeddingProvider();

    default:
      throw new Error("Unsupported embedding provider.");
  }
}