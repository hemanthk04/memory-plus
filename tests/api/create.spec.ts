import { expect, makeKnowledgeInput, test } from "../fixtures";

test.describe("knowledge creation", () => {
  test("stores a memory and returns its identifier", async ({ api }) => {
    const input = makeKnowledgeInput();
    const response = await api.post("/knowledge", { data: input });
    const knowledge = await response.json();

    expect(response.status()).toBe(201);
    expect(knowledge).toMatchObject({
      content: input.content,
      category: input.category,
    });
    expect(knowledge.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test("rejects empty content", async ({ api }) => {
    const response = await api.post("/knowledge", {
      data: makeKnowledgeInput({ content: "" }),
    });

    expect(response.status()).toBe(400);
  });

  test("rejects content exceeding the maximum length", async ({ api }) => {
    const response = await api.post("/knowledge", {
      data: makeKnowledgeInput({ content: "x".repeat(10_001) }),
    });

    expect(response.status()).toBe(400);
  });

  test("rejects invalid metadata", async ({ api }) => {
    const input = makeKnowledgeInput();
    const response = await api.post("/knowledge", {
      data: { ...input, metadata: "not-an-object" },
    });

    expect(response.status()).toBe(400);
  });

  test("rejects an invalid knowledge ID and returns 404 for an unknown ID", async ({ api }) => {
    const invalidResponse = await api.get("/knowledge/not-a-uuid");
    const unknownResponse = await api.get("/knowledge/00000000-0000-4000-8000-000000000000");

    expect(invalidResponse.status()).toBe(400);
    expect(unknownResponse.status()).toBe(404);
  });

  test("does not create a second memory for duplicate remember content", async ({ api }) => {
    const input = makeKnowledgeInput();
    const first = await api.post("/memory/remember", { data: input });
    const second = await api.post("/memory/remember", { data: input });

    expect(first.status()).toBe(201);
    expect(second.status()).toBe(201);
    expect((await second.json()).id).toBe((await first.json()).id);
  });
});
