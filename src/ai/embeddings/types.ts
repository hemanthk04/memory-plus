export interface EmbeddingInput {
  text: string;
}

export interface EmbeddingProvider {
  embed(input: EmbeddingInput): Promise<number[]>;

  embedMany(inputs: EmbeddingInput[]): Promise<number[][]>;
}