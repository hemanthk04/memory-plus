import { randomUUID } from "node:crypto";

import {
  expect,
  request,
  type APIRequestContext,
  type APIResponse,
  test as base,
} from "@playwright/test";

export interface Knowledge {
  id: string;
  content: string;
  category: string;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
}

export interface RecallResult extends Omit<Knowledge, "createdAt" | "updatedAt" | "archivedAt"> {
  score: number;
}

export interface KnowledgeInput {
  content: string;
  category: string;
  tags: string[];
  metadata: Record<string, unknown>;
}

export type CreateKnowledgeInput = Partial<KnowledgeInput>;

interface ApiFixtures {
  api: APIRequestContext;
}

const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

export const test = base.extend<ApiFixtures>({
  api: async ({}, use) => {
    const api = await request.newContext({ baseURL });

    await use(api);
    await api.dispose();
  },
});

export { expect };

export function uniqueValue(prefix: string): string {
  return `${prefix}-${Date.now()}-${randomUUID()}`;
}

export function makeKnowledgeInput(
  overrides: CreateKnowledgeInput = {},
): KnowledgeInput {
  const unique = uniqueValue("memory-plus-api");

  return {
    content: `Test memory ${unique}`,
    category: "test",
    tags: ["playwright", unique],
    metadata: {
      source: "playwright",
      testId: unique,
    },
    ...overrides,
  };
}

export async function createKnowledge(
  api: APIRequestContext,
  input: CreateKnowledgeInput = {},
): Promise<Knowledge> {
  const response = await api.post("/knowledge", {
    data: makeKnowledgeInput(input),
  });

  expect(response.status()).toBe(201);
  return response.json() as Promise<Knowledge>;
}

export async function recallKnowledge(
  api: APIRequestContext,
  query: string,
  limit = 5,
): Promise<RecallResult[]> {
  const response = await api.post("/recall", {
    data: { query, limit },
  });

  expect(response.ok()).toBeTruthy();
  return response.json() as Promise<RecallResult[]>;
}

export async function listKnowledge(
  api: APIRequestContext,
): Promise<Knowledge[]> {
  const response = await api.get("/knowledge");

  expect(response.ok()).toBeTruthy();
  return response.json() as Promise<Knowledge[]>;
}

export async function forgetKnowledge(
  api: APIRequestContext,
  query: string,
): Promise<{ response: APIResponse; forgotten: Knowledge | null }> {
  const response = await api.post("/memory/forget", {
    data: { query },
  });

  if (response.status() === 404) {
    return { response, forgotten: null };
  }

  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as { forgotten: Knowledge };

  return { response, forgotten: body.forgotten };
}
