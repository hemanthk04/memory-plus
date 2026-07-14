import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { knowledgeItems } from "../knowledge/schema.js";
import { toPgVector } from "../shared/pgvector.js";
/**
 * Finds the most semantically similar knowledge items
 * using PostgreSQL pgvector cosine similarity.
 */
async function findSimilar(embedding, limit) {
    const vector = toPgVector(embedding);
    const similarity = sql `
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
        .where(sql `
      ${knowledgeItems.embedding} IS NOT NULL
      AND ${knowledgeItems.archivedAt} IS NULL
    `)
        .orderBy(sql `${knowledgeItems.embedding} <=> ${vector}::vector`)
        .limit(limit);
}
export const retrievalRepository = {
    findSimilar,
};
