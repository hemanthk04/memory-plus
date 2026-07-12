import { embeddingService } from "../ai/embeddings";
import { env } from "../config/env";

import { retrievalRepository } from "./repository";


/**
 * Recalls the most semantically relevant knowledge
 * for a natural-language query.
 *
 * The query is converted into an embedding and compared
 * against stored knowledge embeddings using cosine similarity.
 *
 * @ param query Natural-language search query.
 * @  param limit Maximum number of results.
 * @ param threshold Minimum similarity score.
 */
async function recall(
  query: string,
  limit = env.DEFAULT_RECALL_LIMIT,
  threshold = env.DEFAULT_RECALL_THRESHOLD
) {
  const embedding = await embeddingService.embed(query);

  return retrievalRepository.findSimilar(
    embedding,
    limit,
    threshold
  );
}

export const retrievalService = {
  recall,
};