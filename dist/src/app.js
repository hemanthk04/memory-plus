import { Hono } from "hono";
import knowledge from "./knowledge/route.js";
import retrieval from "./retrieval/routes.js";
import memory from "./memory/routes.js";
const app = new Hono();
app.get("/health", (c) => {
    return c.json({
        status: "ok",
        name: "memory-plus",
        version: "0.1.0",
    });
});
app.route("/knowledge", knowledge);
app.route("/recall", retrieval);
app.route("/memory", memory);
export default app;
