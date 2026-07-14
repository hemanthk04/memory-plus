import {
  createKnowledge,
  expect,
  listKnowledge,
  makeKnowledgeInput,
  test,
} from "../fixtures";

test("newly created memory appears in the active-memory list", async ({ api }) => {
  const input = makeKnowledgeInput();
  const created = await createKnowledge(api, input);
  const memories = await listKnowledge(api);
  const listed = memories.find(({ id }) => id === created.id);

  expect(listed).toMatchObject({
    id: created.id,
    content: input.content,
    metadata: input.metadata,
  });
});
