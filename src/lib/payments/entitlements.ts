import { SubscriptionPlanId, SubscriptionStatus } from '../types';
import { SUBSCRIPTION_PLANS } from './plans';

export interface UserSubscriptionContext {
  planId: SubscriptionPlanId;
  status: SubscriptionStatus;
  monthlyAnalysesUsed: number;
}

export type PremiumFeatureKey = 
  | 'full_review_analysis'
  | 'emotional_tone_deep'
  | 'competitor_benchmarking'
  | 'export_reports'
  | 'unlimited_history'
  | 'ai_action_strategy';

/**
 * Server-side authorization check to verify if a user context can access a given feature or operation.
 * Requirement 43: Never trust frontend flags for authorization. Server must reject unauthorized requests.
 */
export function canAccess(
  userCtx: UserSubscriptionContext | null,
  feature: PremiumFeatureKey
): { allowed: boolean; reason?: string } {
  // If no user context or free user, check free entitlements
  const planId = userCtx ? userCtx.planId : 'free';
  const plan = SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS.free;

  // Active or trialing subscriptions get paid entitlements
  const isActivePaid = userCtx && (userCtx.status === 'active' || userCtx.status === 'trialing') && planId !== 'free';

  if (!isActivePaid && feature !== 'full_review_analysis') {
    switch (feature) {
      case 'emotional_tone_deep':
      case 'competitor_benchmarking':
      case 'export_reports':
      case 'ai_action_strategy':
        return {
          allowed: false,
          reason: `Feature '${feature}' requires a Starter or Pro plan subscription.`
        };
    }
  }

  // Check quota limit for analysis runs
  if (userCtx && userCtx.monthlyAnalysesUsed >= plan.analysisLimit) {
    return {
      allowed: false,
      reason: `Monthly analysis limit of ${plan.analysisLimit} reached for plan '${plan.name}'. Please upgrade to continue.`
    };
  }

  return { allowed: true };
}
