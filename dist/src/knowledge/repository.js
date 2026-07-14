import { db } from "../db";
import { knowledgeItems } from "./schema";
import { desc, eq } from "drizzle-orm";
/**
 * Persists a knowledge item in PostgreSQL.
 */
async function create(data) {
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
async function findById(id) {
    const [knowledge] = await db
        .select()
        .from(knowledgeItems)
        .where(eq(knowledgeItems.id, id));
    return knowledge ?? null;
}
async function update(id, data) {
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
export const knowledgeRepository = {
    create,
    findAll,
    findById,
    update,
};
