import { DataSourceAdapter, ProviderResult } from './index';
import { NormalizedFeedbackItem } from '../types';

export class CSVProvider implements DataSourceAdapter {
  sourceType = 'csv' as const;
  sourceName = 'CSV Customer Feedback Upload';

  isConfigured(): boolean {
    return true; // Always available for user uploads
  }

  async fetchFeedback(query: { companyName: string; rawCsvText?: string }): Promise<ProviderResult> {
    if (!query.rawCsvText) {
      return {
        sourceName: this.sourceName,
        sourceType: this.sourceType,
        isConfigured: true,
        statusMessage: 'No CSV file provided.',
        reviews: []
      };
    }

    const lines = query.rawCsvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      return {
        sourceName: this.sourceName,
        sourceType: this.sourceType,
        isConfigured: true,
        statusMessage: 'CSV file contains no feedback records.',
        reviews: []
      };
    }

    // Basic CSV parser (Header: reviewer, rating, text, date)
    const reviews: NormalizedFeedbackItem[] = [];
    const headers = lines[0].toLowerCase().split(',');

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 2) {
        const rating = parseFloat(parts[1]) || 4.0;
        const text = parts.slice(2).join(',').replace(/^"|"$/g, '').trim() || parts[0];
        reviews.push({
          source: 'csv',
          reviewerName: parts[0] || 'Anonymous',
          rating: Math.min(5, Math.max(1, rating)),
          reviewText: text,
          reviewDate: new Date().toISOString()
        });
      }
    }

    return {
      sourceName: this.sourceName,
      sourceType: this.sourceType,
      isConfigured: true,
      statusMessage: `Successfully parsed ${reviews.length} feedback items from CSV.`,
      reviews
    };
  }
}
