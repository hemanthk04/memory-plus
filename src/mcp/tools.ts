import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { recallSchema } from "../retrieval/validator.js";
import { createKnowledgeSchema } from "../knowledge/validators.js";
import {
  forgetKnowledge,
  getKnowledge,
  recallKnowledge,
  rememberKnowledge,
} from "./handlers.js";

const knowledgeIdSchema = z.object({
  id: z.uuid(),
});

function jsonResult(value: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(value),
      },
    ],
  };
}

/**
 * Registers the Memory Plus service-backed MCP tools.
 */
export function registerMemoryPlusTools(server: McpServer) {
  server.registerTool(
    "remember",
    {
      title: "Remember knowledge",
      description: "Store information, updating a sufficiently similar memory when appropriate.",
      inputSchema: createKnowledgeSchema,
    },
    async (data) => jsonResult(await rememberKnowledge(data)),
  );

  server.registerTool(
    "recall",
    {
      title: "Recall knowledge",
      description: "Find the most semantically relevant active memories for a query.",
      inputSchema: recallSchema,
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ query, limit }) => jsonResult(await recallKnowledge(query, limit)),
  );

  server.registerTool(
    "forget",
    {
      title: "Forget knowledge",
      description: "Archive one memory by its ID without deleting it.",
      inputSchema: knowledgeIdSchema,
      annotations: {
        destructiveHint: true,
      },
    },
    async ({ id }) => jsonResult(await forgetKnowledge(id)),
  );

  server.registerTool(
    "knowledge",
    {
      title: "Get knowledge",
      description: "Retrieve one knowledge item by its ID.",
      inputSchema: knowledgeIdSchema,
      annotations: {
        readOnlyHint: true,
      },
    },
    async ({ id }) => jsonResult(await getKnowledge(id)),
  );
}
