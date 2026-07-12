import { createEmbeddingProvider } from "./factory";

const provider = createEmbeddingProvider();

/**
 * Generates an embedding for text using the configured provider.
 */
async function embed(text: string) {
  return provider.embed({
    text,
  });
}

/**
 * Generates embeddings for multiple text inputs.
 */
async function embedMany(texts: string[]) {
  return provider.embedMany(
    texts.map((text) => ({
      text,
    }))
  );
}

export const embeddingService = {
  embed,
  embedMany,
};