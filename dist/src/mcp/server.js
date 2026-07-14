import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { pathToFileURL } from "node:url";
import { registerMemoryPlusTools } from "./tools.js";
/**
 * Creates a stdio MCP server exposing the Memory Plus service layer.
 */
export function createMemoryPlusMcpServer() {
    const server = new McpServer({
        name: "memory-plus",
        version: "1.0.0",
    });
    registerMemoryPlusTools(server);
    return server;
}
/**
 * Connects the Memory Plus MCP server to the process standard streams.
 */
async function main() {
    const server = createMemoryPlusMcpServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
const entrypoint = process.argv[1];
if (entrypoint && import.meta.url === pathToFileURL(entrypoint).href) {
    main().catch((error) => {
        console.error("Failed to start Memory Plus MCP server:", error);
        process.exitCode = 1;
    });
}
