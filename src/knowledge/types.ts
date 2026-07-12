export interface CreateKnowledgeDto {
  content: string;
  category: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface KnowledgeDto {
  id: string;
  content: string;
  category: string;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecallResult {
  id: string;
  content: string;
  category: string;
  tags: string[];
  metadata: Record<string, unknown>;
  score: number;
}