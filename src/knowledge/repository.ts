import { db } from "../db";
import { knowledgeItems } from "./schema";
import type { CreateKnowledgeInput } from "./validators";
import { desc, eq } from "drizzle-orm";

async function create(data: CreateKnowledgeInput) {
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

export const knowledgeRepository = {
  create,
  findAll,
  findById,
};