import { jsonb, pgTable, text, timestamp, uuid, vector, } from "drizzle-orm/pg-core";
import { EMBEDDING_DIMENSIONS } from "../ai/embeddings/constants";
export const knowledgeItems = pgTable("knowledge_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    category: text("category").notNull(),
    tags: text("tags").array().notNull().default([]),
    metadata: jsonb("metadata").$type().default({}),
    embedding: vector("embedding", {
        dimensions: EMBEDDING_DIMENSIONS,
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
