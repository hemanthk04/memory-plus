import OpenAI from "openai";
import { env } from "../../config/env";
const client = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});
export class OpenAIEmbeddingProvider {
    async embed(input) {
        const response = await client.embeddings.create({
            model: env.OPENAI_EMBEDDING_MODEL,
            input: input.text,
        });
        return response.data[0].embedding;
    }
    async embedMany(inputs) {
        if (inputs.length === 0) {
            return [];
        }
        const response = await client.embeddings.create({
            model: env.OPENAI_EMBEDDING_MODEL,
            input: inputs.map(({ text }) => text),
        });
        return response.data.map(({ embedding }) => embedding);
    }
}
