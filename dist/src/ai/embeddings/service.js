import { createEmbeddingProvider } from "./factory";
const provider = createEmbeddingProvider();
/**
 * Generates an embedding for text using the configured provider.
 */
async function embed(text) {
    return provider.embed({
        text,
    });
}
/**
 * Generates embeddings for multiple text inputs.
 */
async function embedMany(texts) {
    return provider.embedMany(texts.map((text) => ({
        text,
    })));
}
export const embeddingService = {
    embed,
    embedMany,
};
