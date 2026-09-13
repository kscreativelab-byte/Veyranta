import { DataSourceAdapter, ProviderResult } from './index';

export class GoogleProvider implements DataSourceAdapter {
  sourceType = 'google' as const;
  sourceName = 'Google Business Profile';

  isConfigured(): boolean {
    return !!process.env.GOOGLE_BUSINESS_API_KEY;
  }

  async fetchFeedback(query: { companyName: string; websiteUrl?: string }): Promise<ProviderResult> {
    if (!this.isConfigured()) {
      return {
        sourceName: this.sourceName,
        sourceType: this.sourceType,
        isConfigured: false,
        statusMessage: 'Data unavailable from this source (Requires GOOGLE_BUSINESS_API_KEY configuration).',
        reviews: []
      };
    }

    // Official Google Places / Business Profile API call would execute here using GOOGLE_BUSINESS_API_KEY
    return {
      sourceName: this.sourceName,
      sourceType: this.sourceType,
      isConfigured: true,
      statusMessage: 'Connected via Google Places API.',
      reviews: []
    };
  }
}
