import { knowledgeService } from "../knowledge/service.js";
import { memoryService } from "../memory/services.js";
import { retrievalService } from "../retrieval/service.js";
/**
 * Delegates remembering information to the memory behavior layer.
 */
export async function rememberKnowledge(data) {
    return memoryService.remember(data);
}
/**
 * Delegates semantic recall to the retrieval layer.
 */
export async function recallKnowledge(query, limit) {
    return retrievalService.recall(query, limit);
}
/**
 * Archives a memory by ID without performing semantic search.
 */
export async function forgetKnowledge(id) {
    return knowledgeService.archive(id);
}
/**
 * Retrieves one knowledge item by its ID.
 */
export async function getKnowledge(id) {
    return knowledgeService.findById(id);
}
