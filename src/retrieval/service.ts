import { embeddingService } from "../ai/embeddings/index.js";
import { env } from "../config/env.js";

import { retrievalRepository } from "./repository.js";

/**
 * Recalls the most semantically relevant knowledge
 * for a natural-language query.
 *
 * The query is converted into an embedding and compared
 * against stored knowledge embeddings using cosine similarity.
 *
 * @param query Natural-language search query.
 * @param limit Maximum number of results.
 */
async function recall(
  query: string,
  limit = env.DEFAULT_RECALL_LIMIT
) {
  const embedding = await embeddingService.embed(query);

  return retrievalRepository.findSimilar(
    embedding,
    limit
  );
}

export const retrievalService = {
  recall,
};