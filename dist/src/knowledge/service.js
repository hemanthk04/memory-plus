import { embeddingService } from "../ai/embeddings/index.js";
import { knowledgeRepository } from "./repository.js";
/**
 * Adds the current content to the existing chronological history while
 * retaining metadata from both the stored record and the update payload.
 */
function buildMetadataWithHistory(currentMetadata, updatedMetadata, previousContent) {
    const current = currentMetadata ?? {};
    const existingHistory = Array.isArray(current.history)
        ? current.history
        : [];
    return {
        ...current,
        ...updatedMetadata,
        history: [
            ...existingHistory,
            {
                content: previousContent,
                updatedAt: new Date().toISOString(),
            },
        ],
    };
}
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
 * so semantic recall remains accurate. The prior content is appended to
 * metadata.history, preserving a chronological record of memory versions.
 *
 * @param id Knowledge identifier.
 * @param data Updated knowledge payload.
 * @returns The updated knowledge record.
 */
async function update(id, data) {
    const currentKnowledge = await knowledgeRepository.findById(id);
    if (!currentKnowledge) {
        return null;
    }
    const currentContent = currentKnowledge.content.trim().toLowerCase();
    const updatedContent = data.content.trim().toLowerCase();
    if (currentContent === updatedContent) {
        return currentKnowledge;
    }
    const embedding = await embeddingService.embed(data.content);
    const metadata = buildMetadataWithHistory(currentKnowledge.metadata, data.metadata, currentKnowledge.content);
    return knowledgeRepository.update(id, {
        ...data,
        embedding,
        metadata,
    });
}
/**
 * Archives a knowledge item without deleting its stored data.
 *
 * @param id Knowledge identifier.
 * @returns The archived knowledge item if found, otherwise null.
 */
async function archive(id) {
    return knowledgeRepository.archive(id);
}
export const knowledgeService = {
    create,
    findAll,
    findById,
    update,
    archive,
};
