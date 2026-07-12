import { createEmbeddingProvider } from "./factory";

const provider = createEmbeddingProvider();

async function embed(text: string) {
  return provider.embed({
    text,
  });
}

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