import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { knowledgeService } from "./service";
import { createKnowledgeSchema } from "./validators";
const knowledge = new Hono();
knowledge.post("/", zValidator("json", createKnowledgeSchema), async (c) => {
    const body = c.req.valid("json");
    const result = await knowledgeService.create(body);
    return c.json(result, 201);
});
knowledge.get("/", async (c) => {
    const result = await knowledgeService.findAll();
    return c.json(result);
});
knowledge.get("/:id", async (c) => {
    const id = c.req.param("id");
    if (!z.uuid().safeParse(id).success) {
        return c.json({
            message: "Invalid knowledge ID",
        }, 400);
    }
    const knowledge = await knowledgeService.findById(id);
    if (!knowledge) {
        return c.json({
            message: "Knowledge not found",
        }, 404);
    }
    return c.json(knowledge);
});
export default knowledge;
