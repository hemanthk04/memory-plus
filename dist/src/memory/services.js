import { env } from "../config/env";
import { retrievalService } from "../retrieval/service";
import { knowledgeService } from "../knowledge/service";
/**
 * Remembers new information.
 *
 * If a sufficiently similar memory already exists, it is updated.
 * Otherwise, a new memory is created.
 */
async function remember(data) {
    const matches = await retrievalService.recall(data.content, 1);
    const bestMatch = matches[0];
    if (bestMatch &&
        bestMatch.score !== null &&
        bestMatch.score >= env.MEMORY_UPDATE_THRESHOLD) {
        return knowledgeService.update(bestMatch.id, data);
    }
    return knowledgeService.create(data);
}
/**
 * Archives the most semantically relevant active memory for a query.
 *
 * @param query Natural-language description of the memory to forget.
 * @returns The archived memory if found, otherwise null.
 */
async function forget(query) {
    const matches = await retrievalService.recall(query, 1);
    const bestMatch = matches[0];
    if (!bestMatch ||
        bestMatch.score === null ||
        bestMatch.score < env.MEMORY_FORGET_THRESHOLD) {
        return null;
    }
    return knowledgeService.archive(bestMatch.id);
}
export const memoryService = {
    remember,
    forget,
};
