import { embeddingService } from "../ai/embeddings";
import { knowledgeRepository } from "./repository";
/**
 * Stores a new knowledge item and automatically generates
 * an embedding for semantic retrieval.
 *
 * @param data Knowledge payload supplied by the client.
 * @returns The newly created knowledge record.
 */
async function create(data) {
    const embedding = await embeddingService.embed(data.content);
    return knowledgeRepository.create({
        ...data,
        embedding,
    });
}
/**
 * Retrieves all stored knowledge items.
 *
 * @returns All knowledge records ordered by creation date.
 */
async function findAll() {
    return knowledgeRepository.findAll();
}
/**
 * Retrieves a single knowledge item by its ID.
 *
 * @param id Knowledge identifier.
 * @returns The knowledge item if found, otherwise null.
 */
async function findById(id) {
    return knowledgeRepository.findById(id);
}
/**
 * Updates an existing knowledge item.
 *
 * If the content changes, a new embedding is generated
 * so semantic recall remains accurate.
 *
 * @param id Knowledge identifier.
 * @param data Updated knowledge payload.
 * @returns The updated knowledge record.
 */
async function update(id, data) {
    const embedding = await embeddingService.embed(data.content);
    return knowledgeRepository.update(id, {
        ...data,
        embedding,
    });
}
export const knowledgeService = {
    create,
    findAll,
    findById,
    update,
};
