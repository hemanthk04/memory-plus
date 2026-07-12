export interface RecallResult {
  id: string;
  content: string;
  category: string;
  tags: string[];
  metadata: Record<string, unknown>;
  score: number;
}