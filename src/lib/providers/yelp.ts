import { DataSourceAdapter, ProviderResult } from './index';

export class YelpProvider implements DataSourceAdapter {
  sourceType = 'yelp' as const;
  sourceName = 'Yelp Fusion';

  isConfigured(): boolean {
    return !!process.env.YELP_API_KEY;
  }

  async fetchFeedback(): Promise<ProviderResult> {
    return {
      sourceName: this.sourceName,
      sourceType: this.sourceType,
      isConfigured: this.isConfigured(),
      statusMessage: this.isConfigured() ? 'Connected' : 'Data unavailable from this source (Requires YELP_API_KEY configuration).',
      reviews: []
    };
  }
}

export class TrustpilotProvider implements DataSourceAdapter {
  sourceType = 'trustpilot' as const;
  sourceName = 'Trustpilot Integration';

  isConfigured(): boolean {
    return !!process.env.TRUSTPILOT_API_KEY;
  }

  async fetchFeedback(): Promise<ProviderResult> {
    return {
      sourceName: this.sourceName,
      sourceType: this.sourceType,
      isConfigured: this.isConfigured(),
      statusMessage: this.isConfigured() ? 'Connected' : 'Data unavailable from this source (Requires TRUSTPILOT_API_KEY configuration).',
      reviews: []
    };
  }
}
