import { NormalizedFeedbackItem, CompanyOverview, FeedbackSourceType } from '../types';

export interface ProviderResult {
  sourceName: string;
  sourceType: FeedbackSourceType;
  isConfigured: boolean;
  statusMessage: string;
  reviews: NormalizedFeedbackItem[];
  companyInfo?: Partial<CompanyOverview>;
}

export interface DataSourceAdapter {
  sourceType: FeedbackSourceType;
  sourceName: string;
  isConfigured(): boolean;
  fetchFeedback(query: { companyName: string; websiteUrl?: string; rawCsvText?: string }): Promise<ProviderResult>;
}
