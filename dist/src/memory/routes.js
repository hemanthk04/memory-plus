import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { memoryService } from "./services.js";
import { forgetSchema } from "./forget.validator.js";
import { rememberSchema } from "./validator.js";
const memory = new Hono();
memory.post("/remember", zValidator("json", rememberSchema), async (c) => {
    const body = c.req.valid("json");
    const result = await memoryService.remember(body);
    return c.json(result, 201);
});
memory.post("/forget", zValidator("json", forgetSchema), async (c) => {
    const body = c.req.valid("json");
    const forgotten = await memoryService.forget(body.query);
    if (!forgotten) {
        return c.json({
            message: "No matching memory found.",
        }, 404);
    }
    return c.json({ forgotten });
});
export default memory;
