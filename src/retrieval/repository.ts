import { sql } from "drizzle-orm";

import { db } from "../db";
import { knowledgeItems } from "../knowledge/schema";
import { toPgVector } from "../shared/pgvector";


/**
 * Finds the most semantically similar knowledge items
 * using PostgreSQL pgvector cosine similarity.
 */

async function findSimilar(
  embedding: number[],
  limit: number,
  threshold = 0.65
) {
  const vector = toPgVector(embedding);

  const similarity = sql<number>`
    1 - (${knowledgeItems.embedding} <=> ${vector}::vector)
  `;

  return db
    .select({
      id: knowledgeItems.id,
      content: knowledgeItems.content,
      category: knowledgeItems.category,
      tags: knowledgeItems.tags,
      metadata: knowledgeItems.metadata,
      score: similarity,
    })
    .from(knowledgeItems)
    .where(sql`
      ${knowledgeItems.embedding} IS NOT NULL
      AND
      1 - (${knowledgeItems.embedding} <=> ${vector}::vector) >= ${threshold}
    `)
    .orderBy(sql`${knowledgeItems.embedding} <=> ${vector}::vector`)
    .limit(limit);
}

export const retrievalRepository = {
  findSimilar,
};