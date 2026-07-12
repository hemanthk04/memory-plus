import { Hono } from "hono";

import knowledge from "./knowledge/route";
import retrieval from "./retrieval/routes";


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

export default app;