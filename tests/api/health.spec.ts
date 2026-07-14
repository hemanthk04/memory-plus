import { expect, test } from "../fixtures";

test("health endpoint responds successfully", async ({ api }) => {
  const response = await api.get("/health");

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({
    status: "ok",
    name: "memory-plus",
  });
});
