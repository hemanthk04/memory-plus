import { knowledgeRepository } from "./repository";
import type { CreateKnowledgeInput } from "./validators";
import { embeddingService } from "../ai/embeddings";


/**
 * Stores a new knowledge item and automatically generates
 * an embedding for semantic retrieval.
 *
 * @ param data Knowledge payload supplied by the client.
 * @ returns The newly created knowledge record.
 **/
async function create(data: CreateKnowledgeInput) {
  const embedding = await embeddingService.embed(data.content);
  return knowledgeRepository.create({
    ...data,
    embedding,
  });
}

/**
 * Retrieves all stored knowledge items.
 */
async function findAll() {
  return knowledgeRepository.findAll();
}


/**
 * Retrieves a single knowledge item by its ID.
 *
 * @ param id Knowledge identifier.
 * @ returns The knowledge item if found, otherwise null.
 */
async function findById(id: string) {
  return knowledgeRepository.findById(id);
}

async function recall(query: string, limit = 5) {
  const embedding = await embeddingService.embed(query);

  console.log(embedding.length);

  return [];
}


export const knowledgeService = {
  create,
  findAll,
  findById,
};

export const recallService = {
  recall,
};