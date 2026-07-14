import {
  createKnowledge,
  expect,
  forgetKnowledge,
  listKnowledge,
  recallKnowledge,
  test,
  uniqueValue,
} from "../fixtures";

test("archives a memory and excludes it from recall and list results", async ({ api }) => {
  const content = `I live in ${uniqueValue("test-city")}.`;
  const created = await createKnowledge(api, { content });
  const { response, forgotten } = await forgetKnowledge(api, content);

  expect(response.ok()).toBeTruthy();
  expect(forgotten?.id).toBe(created.id);

  const [recalled, listed] = await Promise.all([
    recallKnowledge(api, content),
    listKnowledge(api),
  ]);

  expect(recalled.some(({ id }) => id === created.id)).toBeFalsy();
  expect(listed.some(({ id }) => id === created.id)).toBeFalsy();
});

test("returns 404 when no memory exceeds the forget threshold", async ({ api }) => {
  const { response, forgotten } = await forgetKnowledge(
    api,
    `nonexistent memory ${uniqueValue("no-match")}`,
  );

  expect(response.status()).toBe(404);
  expect(forgotten).toBeNull();
  expect(await response.json()).toMatchObject({
    message: "No matching memory found.",
  });
});
