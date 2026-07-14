import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { retrievalService } from "./service.js";
import { recallSchema } from "./validator.js";
const retrieval = new Hono();
retrieval.post("/", zValidator("json", recallSchema), async (c) => {
    const body = c.req.valid("json");
    const result = await retrievalService.recall(body.query, body.limit);
    return c.json(result);
});
export default retrieval;
