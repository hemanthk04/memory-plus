import { env } from "../config/env";

import { retrievalService } from "../retrieval/service";
import { knowledgeService } from "../knowledge/service";
import type { CreateKnowledgeInput } from "../knowledge/validators";


/**
 * Remembers new information.
 *
 * If a sufficiently similar memory already exists, it is updated.
 * Otherwise, a new memory is created.
 */
async function remember(data: CreateKnowledgeInput) {
  const matches = await retrievalService.recall(
    data.content,
    1
  );

  const bestMatch = matches[0];

 if (
  bestMatch &&
  bestMatch.score !== null &&
  bestMatch.score >= env.MEMORY_UPDATE_THRESHOLD
  ){
    return knowledgeService.update(bestMatch.id, data);
  }
  return knowledgeService.create(data);
}

export const memoryService = {
  remember,
};