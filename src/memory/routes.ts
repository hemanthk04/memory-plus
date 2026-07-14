import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { memoryService } from "./services";
import { rememberSchema } from "./validator";

const memory = new Hono();

memory.post(
  "/remember",
  zValidator("json", rememberSchema),
  async (c) => {
    const body = c.req.valid("json");

    const result = await memoryService.remember(body);

    return c.json(result, 201);
  }
);

export default memory;