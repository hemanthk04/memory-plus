import { env } from "../../config/env.js";
import { OpenAIEmbeddingProvider } from "./openai.js";
export function createEmbeddingProvider() {
    switch (env.EMBEDDING_PROVIDER) {
        case "openai":
            return new OpenAIEmbeddingProvider();
        default:
            throw new Error("Unsupported embedding provider.");
    }
}
