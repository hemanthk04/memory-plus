import { env } from "../../config/env";
import { OpenAIEmbeddingProvider } from "./openai";
export function createEmbeddingProvider() {
    switch (env.EMBEDDING_PROVIDER) {
        case "openai":
            return new OpenAIEmbeddingProvider();
        default:
            throw new Error("Unsupported embedding provider.");
    }
}
