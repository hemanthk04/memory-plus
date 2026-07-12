import { knowledgeRepository } from "./repository";
import type { CreateKnowledgeInput } from "./validators";
import { embeddingService } from "../ai/embeddings";

async function create(data: CreateKnowledgeInput) {
  const embedding = await embeddingService.embed(data.content);
  return knowledgeRepository.create({
    ...data,
    embedding,
  });
}

async function findAll() {
  return knowledgeRepository.findAll();
}

async function findById(id: string) {
  return knowledgeRepository.findById(id);
}

export const knowledgeService = {
  create,
  findAll,
  findById,
};