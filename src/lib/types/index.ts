// TypeScript Definitions for Veyranta Platform

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  companyName?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export type SubscriptionPlanId = 'free' | 'starter' | 'pro' | 'business';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'paused' | 'canceled' | 'expired' | 'payment_failed';

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  priceMonthly: number;
  analysisLimit: number;
  competitorLimit: number;
  aiDeepAnalysis: boolean;
  exportReports: boolean;
  priorityProcessing: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: SubscriptionPlanId;
  status: SubscriptionStatus;
  razorpaySubscriptionId?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface CompanyInput {
  name: string;
  websiteUrl?: string;
  industry?: string;
  location?: string;
}

export interface CompanyOverview {
  id?: string;
  name: string;
  websiteUrl?: string;
  normalizedDomain?: string;
  industry?: string;
  category?: string;
  location?: string;
  description?: string;
  productsServices?: string[];
  publicContact?: string;
  metaTitle?: string;
  metaDescription?: string;
  confidenceScore?: number; // 0 to 1
  detectedCustomerSegments?: string[];
  publicReputationSummary?: string;
}

export type FeedbackSourceType = 'google' | 'reddit' | 'news' | 'social' | 'appstore' | 'csv' | 'manual';

export interface NormalizedFeedbackItem {
  id?: string;
  source: FeedbackSourceType;
  sourceUrl?: string;
  reviewerName?: string;
  reviewDate: string;
  rating: number; // 1-5
  reviewText: string;
  language?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  sentimentScore?: number; // 0-100
  emotionalTone?: string;
  topics?: string[];
  productMentioned?: string;
  location?: string;
  responseStatus?: 'responded' | 'unresponded';
  responseDate?: string;
}

export interface StarCategoryBreakdown {
  fiveStarCount: number;
  fourStarCount: number;
  threeStarCount: number;
  twoStarCount: number;
  oneStarCount: number;
}

export interface SentimentAnalysisResult {
  overallScore: number; // 0-100
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  totalReviews: number;
  averageRating: number;
  starCategories: StarCategoryBreakdown;
  goodWords: { word: string; count: number; sentiment: 'positive' }[];
  badWords: { word: string; count: number; sentiment: 'negative' }[];
  nlpIntensityScore: number; // 0-100
  positiveIntensity: number; // 0-100
  negativeIntensity: number; // 0-100
  textRatingMismatchPct: number; // 0-100
  mismatchExplanation: string;
}

export interface EmotionAnalysisResult {
  emotion: 'Frustration' | 'Trust' | 'Joy' | 'Churn Risk' | 'Satisfaction' | 'Gratitude' | 'Disappointment' | 'Anxiety' | 'Confusion' | 'Brand Advocacy' | 'Sarcasm' | 'Neutral' | 'Happiness' | 'Anger' | 'Concern';
  percentage: number;
  intensity: 'Low' | 'Medium' | 'High';
  confidence: number;
  evidence: string;
  starRatingCorrelation?: string;
}

export interface TopicTheme {
  topicName: string;
  mentionCount: number;
  percentage: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  trend: 'improving' | 'stable' | 'worsening';
  severity: 'Low' | 'Medium' | 'High';
  representativeQuotes: string[];
}

export interface IssueDetectionItem {
  id?: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  frequency: number;
  trend: 'Improving' | 'Stable' | 'Worsening' | 'Emerging';
  businessImpact: 'Low' | 'Medium' | 'High';
  recommendedAction: string;
}

export interface PraiseDetectionItem {
  id?: string;
  title: string;
  category: string;
  mentionCount: number;
  competitiveAdvantage?: string;
}

export interface VeyrantaReputationScore {
  overallScore: number; // 0-100
  label: "Veyranta Composite Reputation Score";
  subscores: {
    reviewQuality: number;      // 25%
    sentiment: number;          // 20%
    reviewRecency: number;      // 15%
    reviewConsistency: number;  // 15%
    responseHealth: number;     // 10%
    cxSignals: number;          // 10%
    reputationRisk: number;     // 5%
  };
  positiveFactors: string[];
  negativeFactors: string[];
  explanation: string;
  confidenceLevel: 'Low' | 'Medium' | 'High';
}

export interface CategorizedRecommendations {
  whereToImprove: {
    title: string;
    description: string;
    severity: 'High' | 'Critical';
    targetAction: string;
  }[];
  whatMakesClientsHappy: {
    title: string;
    description: string;
    impact: 'High Positive';
    keyDriver: string;
  }[];
  whatMakesClientsAngry: {
    title: string;
    description: string;
    trigger: string;
    churnRisk: 'High' | 'Critical';
  }[];
}

export interface PrioritizedRecommendation {
  priority: 'P1 - Critical' | 'P2 - High' | 'P3 - Moderate';
  problem: string;
  evidence: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  businessImpact: 'Low' | 'Medium' | 'High';
  recommendedAction: string;
  whyItMatters: string;
  suggestedKpi: string;
  targetSla?: string;
  kpiLift?: string;
  categoryType?: 'whereToImprove' | 'whatMakesClientsHappy' | 'whatMakesClientsAngry';
}

export interface CompetitorBenchmark {
  competitorName: string;
  industry: string;
  reputationScore: number;
  averageRating: number;
  reviewVolume: number;
  positiveSentimentPct: number;
  glimpseSummary: string;
  whereYouWin: string[];
  whereCompetitorsWin: string[];
  opportunities: string[];
  risks: string[];
}

export interface ExecutiveSummary {
  overallReputation: string;
  topStrengths: string[];
  topWeaknesses: string[];
  biggestEmergingRisk: string;
  keyCustomerExpectation: string;
  primaryActionItem: string;
  competitivePosition: string;
}

export interface PlatformBreakdownItem {
  platform: 'Google Reviews' | 'Reddit Discussions' | 'News & Articles' | 'Social Media' | 'App Store / Play Store' | 'CSV Datasets';
  reviewCount: number;
  averageRating: number;
  positivePct: number;
  negativePct: number;
  trend: 'Upward' | 'Stable' | 'At Risk';
}

export interface IndustryTrendItem {
  title: string;
  description: string;
  customerDemand: string;
  marketShift: 'High Demand' | 'Growing Expectation' | 'Critical Requirement';
}

export interface AnalysisReport {
  id: string;
  company: CompanyOverview;
  reviews: NormalizedFeedbackItem[];
  reputationScore: VeyrantaReputationScore;
  sentiment: SentimentAnalysisResult;
  emotions: EmotionAnalysisResult[];
  topics: TopicTheme[];
  issues: IssueDetectionItem[];
  strengths: PraiseDetectionItem[];
  industryTrends?: IndustryTrendItem[];
  recommendations: PrioritizedRecommendation[];
  categorizedRecommendations?: CategorizedRecommendations;
  competitors: CompetitorBenchmark[];
  platformBreakdown?: PlatformBreakdownItem[];
  roiRiskSummary?: {
    revenueRiskEstimate: string;
    targetSlaHours: number;
    expectedKpiLift: string;
  };
  executiveSummary: ExecutiveSummary;
  dataSources: { source: string; status: string; reviewCount: number }[];
  confidence: {
    reviewsAnalyzed: number;
    sourcesCount: number;
    timeframe: string;
    level: 'Low' | 'Medium' | 'High';
    note?: string;
  };
  isFreePreview: boolean;
  unlockedPlanTier?: 'free' | 'starter_299' | 'pro_799' | 'business_2499';
  createdAt: string;
}
