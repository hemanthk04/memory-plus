import { env } from "../../config/env";

import { OpenAIEmbeddingProvider } from "./openai";
import type { EmbeddingProvider } from "./types";

export function createEmbeddingProvider(): EmbeddingProvider {
  switch (env.EMBEDDING_PROVIDER) {
    case "openai":
      return new OpenAIEmbeddingProvider();

    default:
      throw new Error("Unsupported embedding provider.");
  }
}