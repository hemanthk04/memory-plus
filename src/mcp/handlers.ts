import { knowledgeService } from "../knowledge/service.js";
import type { CreateKnowledgeInput } from "../knowledge/validators.js";
import { memoryService } from "../memory/services.js";
import { retrievalService } from "../retrieval/service.js";

/**
 * Delegates remembering information to the memory behavior layer.
 */
export async function rememberKnowledge(data: CreateKnowledgeInput) {
  return memoryService.remember(data);
}

/**
 * Delegates semantic recall to the retrieval layer.
 */
export async function recallKnowledge(query: string, limit?: number) {
  return retrievalService.recall(query, limit);
}

/**
 * Archives a memory by ID without performing semantic search.
 */
export async function forgetKnowledge(id: string) {
  return knowledgeService.archive(id);
}

/**
 * Retrieves one knowledge item by its ID.
 */
export async function getKnowledge(id: string) {
  return knowledgeService.findById(id);
}
