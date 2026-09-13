import { SubscriptionPlan, SubscriptionPlanId } from '../types';

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlan> = {
  free: {
    id: 'free',
    name: 'Free Preview',
    priceMonthly: 0,
    analysisLimit: 3,
    competitorLimit: 0,
    aiDeepAnalysis: false,
    exportReports: false,
    priorityProcessing: false
  },
  starter: {
    id: 'starter',
    name: 'Pro 299 Pack',
    priceMonthly: 299,
    analysisLimit: 25,
    competitorLimit: 1,
    aiDeepAnalysis: true,
    exportReports: true,
    priorityProcessing: false
  },
  pro: {
    id: 'pro',
    name: 'Pro 799 Pack',
    priceMonthly: 799,
    analysisLimit: 150,
    competitorLimit: 10,
    aiDeepAnalysis: true,
    exportReports: true,
    priorityProcessing: true
  },
  business: {
    id: 'business',
    name: 'Enterprise 2499 Pack',
    priceMonthly: 2499,
    analysisLimit: 2000,
    competitorLimit: 100,
    aiDeepAnalysis: true,
    exportReports: true,
    priorityProcessing: true
  }
};
