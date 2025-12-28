
export interface OptimizationResult {
  titles: string[];
  description: string;
  hashtags: string[];
  viralityScore: number;
  retentionTip: string;
  ctrAnalysis: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}
