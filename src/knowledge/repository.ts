import { db } from "../db";
import { knowledgeItems } from "./schema";
import type { CreateKnowledgeInput } from "./validators";
import { desc, eq } from "drizzle-orm";

type CreateKnowledgeRecord = CreateKnowledgeInput & {
  embedding: number[];
};

type UpdateKnowledgeRecord = Partial<CreateKnowledgeRecord>;
/**
 * Persists a knowledge item in PostgreSQL.
 */
async function create(data: CreateKnowledgeRecord) {
  const [knowledge] = await db
    .insert(knowledgeItems)
    .values(data)
    .returning();

  return knowledge;
}

async function findAll() {
  return db
    .select()
    .from(knowledgeItems)
    .orderBy(desc(knowledgeItems.createdAt));
}

async function findById(id: string) {
  const [knowledge] = await db
    .select()
    .from(knowledgeItems)
    .where(eq(knowledgeItems.id, id));

  return knowledge ?? null;
}

async function update(
  id: string,
  data: UpdateKnowledgeRecord
) {
  const [knowledge] = await db
    .update(knowledgeItems)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(knowledgeItems.id, id))
    .returning();

  return knowledge ?? null;
}

/**
 * Marks a knowledge item as archived without changing its content or metadata.
 */
async function archive(id: string) {
  const [knowledge] = await db
    .update(knowledgeItems)
    .set({
      archivedAt: new Date(),
    })
    .where(eq(knowledgeItems.id, id))
    .returning();

  return knowledge ?? null;
}

export const knowledgeRepository = {
  create,
  findAll,
  findById,
  update,
  archive,
};
