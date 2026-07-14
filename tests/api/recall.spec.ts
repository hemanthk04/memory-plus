import {
  createKnowledge,
  expect,
  recallKnowledge,
  test,
  uniqueValue,
} from "../fixtures";

test("recalls related knowledge and returns scores in descending order", async ({ api }) => {
  const topic = uniqueValue("orbital-astronomy");
  const expected = await createKnowledge(api, {
    content: `The ${topic} observatory studies exoplanet atmospheres with infrared spectroscopy.`,
  });
  await createKnowledge(api, {
    content: `The ${topic} cafeteria serves vegetarian lunches to observatory staff.`,
  });

  const results = await recallKnowledge(
    api,
    `Which ${topic} instrument studies exoplanet atmospheres?`,
    10,
  );

  expect(results.some(({ id }) => id === expected.id)).toBeTruthy();
  expect(results).toEqual(
    [...results].sort((left, right) => right.score - left.score),
  );
});
