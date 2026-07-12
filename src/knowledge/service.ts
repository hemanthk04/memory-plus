import { knowledgeRepository } from "./repository";
import type { CreateKnowledgeInput } from "./validators";

async function create(data: CreateKnowledgeInput) {
  return knowledgeRepository.create(data);
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