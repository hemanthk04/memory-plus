import { Hono } from "hono";
import knowledge from "./knowledge/route";
import retrieval from "./retrieval/routes";
import memory from "./memory/routes";
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
