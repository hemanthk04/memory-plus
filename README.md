# 🧠 Memory Plus

> A semantic memory engine for AI agents, powered by embeddings, PostgreSQL pgvector, and the Model Context Protocol (MCP).

Memory Plus enables AI applications to **remember**, **recall**, **update**, and **forget** information using semantic search instead of simple keyword matching. It exposes both a REST API and an MCP server, allowing LLMs like Claude Desktop to use it as an external memory system.

---

## ✨ Features

- 🧠 Semantic memory using OpenAI embeddings
- 🔍 Vector similarity search with PostgreSQL + pgvector
- 💾 Persistent long-term memory
- 🔄 Automatic memory updates based on semantic similarity
- 🗑️ Soft-delete (Forget) with archival support
- 📜 Memory history preservation
- ⚡ REST API built with Hono
- 🔌 Model Context Protocol (MCP) support for AI assistants
- 🧩 Clean Service / Repository architecture

---

## 🏗️ Architecture

```
                    +-------------------+
                    | Claude Desktop    |
                    | ChatGPT / Agents  |
                    +---------+---------+
                              |
                              | MCP
                              |
                    +---------v---------+
                    | Memory Plus MCP   |
                    +---------+---------+
                              |
                              |
                    +---------v---------+
                    | Memory Service    |
                    +---------+---------+
                              |
            +-----------------+-----------------+
            |                                   |
            |                                   |
+-----------v-----------+           +-----------v-----------+
| Knowledge Service     |           | Retrieval Service     |
+-----------+-----------+           +-----------+-----------+
            |                                   |
            +-----------------+-----------------+
                              |
                    +---------v---------+
                    | PostgreSQL        |
                    | pgvector          |
                    +---------+---------+
                              |
                    +---------v---------+
                    | OpenAI Embeddings |
                    +-------------------+
```

---

# 📦 Tech Stack

- TypeScript
- Hono
- Drizzle ORM
- PostgreSQL
- pgvector
- OpenAI Embeddings
- Zod
- MCP SDK

---

# 🚀 Getting Started

## Clone

```bash
git clone https://github.com/hemanthk04/memory-plus.git

cd memory-plus
```

## Install

```bash
pnpm install
```

## Configure

Create a `.env`

```env
DATABASE_URL=

OPENAI_API_KEY=

EMBEDDING_PROVIDER=openai
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

DEFAULT_RECALL_LIMIT=5
DEFAULT_RECALL_THRESHOLD=0.65

MEMORY_UPDATE_THRESHOLD=0.45
MEMORY_FORGET_THRESHOLD=0.65
```

## Database

```bash
pnpm db:migrate
```

## Run

```bash
pnpm dev
```

---

# 🔌 REST API

## Remember

```http
POST /memory
```

```json
{
  "content": "My favourite coffee is Blue Tokai.",
  "category": "preference",
  "tags": ["coffee"]
}
```

---

## Recall

```http
POST /recall
```

```json
{
  "query": "What's my favourite coffee?"
}
```

---

## Forget

```http
POST /memory/forget
```

```json
{
  "query": "Blue Tokai"
}
```

---

# 🤖 MCP Support

Memory Plus can be connected directly to AI assistants supporting the **Model Context Protocol**.

Available tools:

- remember
- recall
- forget
- knowledge

Example:

```
Remember that my favourite coffee is Blue Tokai.

↓

Claude calls

memory-plus:remember

↓

Memory stored

↓

Later...

What's my favourite coffee?

↓

Claude calls

memory-plus:recall

↓

Blue Tokai
```

---

# 📂 Project Structure

```
src
 ├── ai
 ├── config
 ├── db
 ├── knowledge
 ├── memory
 ├── retrieval
 ├── mcp
 └── shared
```

---

# 🛣️ Roadmap

- [x] Knowledge Storage
- [x] Semantic Recall
- [x] Automatic Memory Update
- [x] Memory History
- [x] Forget (Soft Delete)
- [x] MCP Server
- [x] Playwright API Tests
- [ ] Docker Support
- [ ] Memory Dashboard
- [ ] Multi-provider Embeddings

---

# 📄 License

MIT

---

# 👨‍💻 Author

**Hemanth Kapalavai**

If you found this project useful, consider giving it a ⭐.