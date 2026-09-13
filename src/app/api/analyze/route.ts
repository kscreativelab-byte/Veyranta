import { NextResponse } from 'next/server';
import { validateAndNormalizeUrl, sanitizeInputText, validateCompanyDomainMatch } from '@/lib/security/ssrf';
import { fetchCompanyMetadata } from '@/lib/providers/public_web';
import { CSVProvider } from '@/lib/providers/csv';
import { AIService } from '@/lib/ai/ai_service';
import { NormalizedFeedbackItem } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName = '', websiteUrl = '', industry = '', rawCsvText = '', isFreePreview = true, userPlanId = 'free' } = body;

    let sanitizedName = sanitizeInputText(companyName).trim();
    let cleanUrlInput = (websiteUrl || '').trim();

    if (cleanUrlInput && !cleanUrlInput.startsWith('http://') && !cleanUrlInput.startsWith('https://')) {
      cleanUrlInput = 'https://' + cleanUrlInput;
    }

    // Enforce Company Name vs Website URL Mismatch Check
    if (sanitizedName && cleanUrlInput) {
      const matchCheck = validateCompanyDomainMatch(sanitizedName, cleanUrlInput);
      if (!matchCheck.isMatch) {
        return NextResponse.json(
          { success: false, error: matchCheck.error },
          { status: 400 }
        );
      }
    }

    let validUrl = '';
    let extractedDomain = '';
    if (cleanUrlInput) {
      const urlCheck = validateAndNormalizeUrl(cleanUrlInput);
      if (urlCheck.isValid && urlCheck.normalizedUrl) {
        validUrl = urlCheck.normalizedUrl;
        extractedDomain = urlCheck.domain || '';
      }
    }

    if (!sanitizedName && extractedDomain) {
      const brandPart = extractedDomain.split('.')[0];
      sanitizedName = brandPart.charAt(0).toUpperCase() + brandPart.slice(1);
    }

    if (!sanitizedName && !validUrl) {
      sanitizedName = 'Target Business';
    }

    const companyOverview = await fetchCompanyMetadata(sanitizedName, validUrl);
    if (industry) {
      companyOverview.industry = industry;
      companyOverview.category = industry;
    }

    let reviews: NormalizedFeedbackItem[] = [];
    if (rawCsvText) {
      try {
        const csvAdapter = new CSVProvider();
        const csvResult = await csvAdapter.fetchFeedback({
          companyName: companyOverview.name || sanitizedName,
          rawCsvText
        });
        reviews = csvResult.reviews || [];
      } catch (csvErr) {
        console.warn('[CSV Parsing Warning]', csvErr);
      }
    }

    const aiService = new AIService();
    const report = await aiService.analyzeCompany(
      companyOverview as any,
      reviews,
      isFreePreview,
      userPlanId
    );

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    console.error('[Analysis API Error]', err);
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during intelligence analysis.' },
      { status: 500 }
    );
  }
}
