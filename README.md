# Memory Plus

An MCP-compatible AI knowledge engine that provides long-term memory for AI assistants.

## Tech Stack

- Hono
- TypeScript
- Drizzle ORM
- PostgreSQL
- Supabase
- OpenAI Embeddings (planned)

## Roadmap

- [x] Knowledge Storage
- [x] AI Embeddings
- [ ] Semantic Recall
- [ ] MCP Server
- [ ] Memory Layers
- [ ] Importance Scoring
- [ ] Hybrid Search
- [ ] Multi-provider AI
- [ ] Web Dashboard

## MCP server

Memory Plus includes a local stdio MCP server for MCP clients such as Claude Desktop. The server exposes four tools:

- `remember`: store a memory using the existing intelligent remember workflow.
- `recall`: find semantically similar active memories.
- `forget`: archive a memory by its ID.
- `knowledge`: retrieve one memory by its ID.

The MCP layer delegates to the existing Memory Plus services; it does not access the database or reimplement memory behavior.

### Claude Desktop

1. Install dependencies and build the project:

   ```bash
   pnpm install
   pnpm build
   ```

2. Add a `memory-plus` entry to Claude Desktop's MCP configuration. Replace the project path and provide the same environment variables used by the API:

   ```json
   {
     "mcpServers": {
       "memory-plus": {
         "command": "node",
         "args": ["C:/path/to/memory-plus/dist/src/mcp/server.js"],
         "env": {
           "DATABASE_URL": "<your-database-url>",
           "OPENAI_API_KEY": "<your-openai-api-key>",
           "EMBEDDING_PROVIDER": "openai",
           "OPENAI_EMBEDDING_MODEL": "text-embedding-3-small"
         }
       }
     }
   }
   ```

   You can also run the server from the project directory during development with `pnpm mcp`.

3. Restart Claude Desktop. Its tool picker will show the four Memory Plus tools.
