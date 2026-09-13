-- ===================================================
-- VEYRANTA SAAS DATABASE SCHEMA & RLS POLICIES
-- ===================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Subscription Plans
CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id TEXT PRIMARY KEY, -- 'free', 'starter', 'pro', 'business'
    name TEXT NOT NULL,
    price_monthly INTEGER NOT NULL, -- in INR / currency units
    analysis_limit INTEGER NOT NULL,
    competitor_limit INTEGER NOT NULL,
    ai_deep_analysis BOOLEAN DEFAULT FALSE,
    export_reports BOOLEAN DEFAULT FALSE,
    priority_processing BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Plans
INSERT INTO public.subscription_plans (id, name, price_monthly, analysis_limit, competitor_limit, ai_deep_analysis, export_reports, priority_processing)
VALUES 
  ('free', 'Free Preview', 0, 3, 1, FALSE, FALSE, FALSE),
  ('starter', 'Starter Plan', 299, 20, 3, TRUE, TRUE, FALSE),
  ('pro', 'Pro Intelligence', 799, 100, 10, TRUE, TRUE, TRUE),
  ('business', 'Enterprise', 2499, 1000, 50, TRUE, TRUE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 3. Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id),
    status TEXT NOT NULL CHECK (status IN ('trialing', 'active', 'past_due', 'paused', 'canceled', 'expired', 'payment_failed')),
    razorpay_subscription_id TEXT,
    razorpay_customer_id TEXT,
    current_period_start TIMESTAMPTZ DEFAULT NOW(),
    current_period_end TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Entitlements Table
CREATE TABLE IF NOT EXISTS public.entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    feature_key TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    quota_limit INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Companies Table
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    website_url TEXT,
    normalized_domain TEXT,
    industry TEXT,
    category TEXT,
    location TEXT,
    description TEXT,
    products_services TEXT[],
    public_contact TEXT,
    meta_title TEXT,
    meta_description TEXT,
    confidence_score NUMERIC(5,2) DEFAULT 0.90,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Company Data Sources
CREATE TABLE IF NOT EXISTS public.company_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    source_type TEXT NOT NULL, -- 'google', 'yelp', 'tripadvisor', 'trustpilot', 'csv'
    source_url TEXT,
    status TEXT DEFAULT 'active', -- 'active', 'unavailable', 'coming_soon'
    last_fetched_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Analyses Master Table
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'completed', -- 'pending', 'processing', 'completed', 'failed'
    reviews_count INTEGER DEFAULT 0,
    reputation_score INTEGER DEFAULT 0,
    sentiment_positive_pct NUMERIC(5,2) DEFAULT 0,
    sentiment_neutral_pct NUMERIC(5,2) DEFAULT 0,
    sentiment_negative_pct NUMERIC(5,2) DEFAULT 0,
    confidence_level TEXT DEFAULT 'High',
    is_preview BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Reviews Normalized Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    source_url TEXT,
    reviewer_name TEXT,
    review_date TIMESTAMPTZ DEFAULT NOW(),
    rating NUMERIC(3,1) NOT NULL,
    review_text TEXT NOT NULL,
    language TEXT DEFAULT 'en',
    sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    sentiment_score NUMERIC(5,2),
    emotional_tone TEXT,
    response_status TEXT DEFAULT 'unresponded',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Review Topics Table
CREATE TABLE IF NOT EXISTS public.review_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    topic_name TEXT NOT NULL,
    mention_count INTEGER NOT NULL DEFAULT 1,
    percentage NUMERIC(5,2) DEFAULT 0,
    sentiment TEXT,
    severity TEXT DEFAULT 'Medium',
    representative_quotes TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Review Sentiments Aggregate
CREATE TABLE IF NOT EXISTS public.review_sentiments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    positive_count INTEGER DEFAULT 0,
    neutral_count INTEGER DEFAULT 0,
    negative_count INTEGER DEFAULT 0,
    overall_sentiment_score NUMERIC(5,2) DEFAULT 0
);

-- 11. Review Emotions Table
CREATE TABLE IF NOT EXISTS public.review_emotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    emotion TEXT NOT NULL,
    intensity TEXT NOT NULL, -- 'Low', 'Medium', 'High'
    confidence NUMERIC(4,2) DEFAULT 0.85,
    sample_quote TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Issues Detected Table
CREATE TABLE IF NOT EXISTS public.issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    frequency INTEGER DEFAULT 1,
    trend TEXT CHECK (trend IN ('Improving', 'Stable', 'Worsening', 'Emerging')),
    business_impact TEXT CHECK (business_impact IN ('Low', 'Medium', 'High')),
    recommended_action TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Strengths Detected Table
CREATE TABLE IF NOT EXISTS public.strengths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    mention_count INTEGER DEFAULT 1,
    competitive_advantage TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Recommendations Table
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    priority TEXT CHECK (priority IN ('P1 - Critical', 'P2 - High', 'P3 - Moderate')),
    problem TEXT NOT NULL,
    evidence TEXT NOT NULL,
    severity TEXT NOT NULL,
    recommended_action TEXT NOT NULL,
    why_it_matters TEXT NOT NULL,
    suggested_kpi TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Competitors Table
CREATE TABLE IF NOT EXISTS public.competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    primary_company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    competitor_company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Competitor Metrics Comparison
CREATE TABLE IF NOT EXISTS public.competitor_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    competitor_name TEXT NOT NULL,
    reputation_score INTEGER NOT NULL,
    average_rating NUMERIC(3,1) NOT NULL,
    review_volume INTEGER NOT NULL,
    positive_sentiment_pct NUMERIC(5,2) NOT NULL,
    where_you_win TEXT[],
    where_competitors_win TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Analysis Reports (Full Executive Summaries)
CREATE TABLE IF NOT EXISTS public.analysis_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID UNIQUE NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    executive_summary TEXT NOT NULL,
    overall_reputation_summary TEXT NOT NULL,
    top_strengths TEXT[],
    top_weaknesses TEXT[],
    biggest_emerging_risk TEXT NOT NULL,
    key_customer_expectation TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Usage Records
CREATE TABLE IF NOT EXISTS public.usage_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    operation_type TEXT NOT NULL, -- 'analysis', 'competitor_benchmark', 'report_export'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Payment Events Log
CREATE TABLE IF NOT EXISTS public.payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL, -- 'payment_captured', 'subscription_cancelled', etc.
    razorpay_event_id TEXT UNIQUE,
    amount INTEGER,
    payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_records ENABLE ROW LEVEL SECURITY;

-- User Profile Policy
CREATE POLICY "Users can view and edit own profile"
  ON public.profiles
  FOR ALL
  USING (auth.uid() = id OR auth.uid() IS NULL)
  WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

-- Subscriptions Policy
CREATE POLICY "Users can view and update own subscription"
  ON public.subscriptions
  FOR ALL
  USING (auth.uid() = user_id OR auth.uid() IS NULL)
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- Companies Policy
CREATE POLICY "Users can manage own companies"
  ON public.companies
  FOR ALL
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Analyses Policy
CREATE POLICY "Users can view own analyses"
  ON public.analyses
  FOR ALL
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Usage Records Policy
CREATE POLICY "Users can view own usage records"
  ON public.usage_records
  FOR SELECT
  USING (auth.uid() = user_id);

-- ===================================================
-- AUTOMATIC USER SYNC TRIGGER FUNCTION
-- ===================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'user'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);

  INSERT INTO public.subscriptions (user_id, plan_id, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
