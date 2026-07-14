import OpenAI from "openai";

import { env } from "../../config/env.js";
import type {
  EmbeddingInput,
  EmbeddingProvider,
} from "./types.js";

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export class OpenAIEmbeddingProvider
  implements EmbeddingProvider {

  async embed(
    input: EmbeddingInput
  ): Promise<number[]> {

    const response =
      await client.embeddings.create({
        model: env.OPENAI_EMBEDDING_MODEL,
        input: input.text,
      });

    return response.data[0].embedding;
  }

  async embedMany(
    inputs: EmbeddingInput[]
  ): Promise<number[][]> {

    if (inputs.length === 0) {
      return [];
    }

    const response =
      await client.embeddings.create({
        model: env.OPENAI_EMBEDDING_MODEL,
        input: inputs.map(({ text }) => text),
      });

    return response.data.map(
      ({ embedding }) => embedding
    );
  }
}