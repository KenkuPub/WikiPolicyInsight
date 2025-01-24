export interface Article {
  id: number;
  title: string;
  content: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  sentimentScore: number;
  constitutionalityScore: number;
  legalRiskScore: number;
  implementationRiskScore: number;
}

export interface Revision {
  id: number;
  articleId: number;
  content: string;
  authorId: number;
  createdAt: string;
}

export interface SearchResult {
  id: number;
  title: string;
  path: string;
  excerpt: string;
}

export interface ScoreCardProps {
  sentimentScore: number;
  constitutionalityScore: number;
  legalRiskScore: number;
  implementationRiskScore: number;
}