// SSRF & Security Validation Utility

/**
 * Validates and normalizes user-provided URLs to prevent SSRF (Server-Side Request Forgery) vulnerabilities.
 */
export function validateAndNormalizeUrl(inputUrl: string): { isValid: boolean; normalizedUrl?: string; domain?: string; error?: string } {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return { isValid: false, error: 'URL input is required.' };
  }

  let formatted = inputUrl.trim();
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = 'https://' + formatted;
  }

  try {
    const parsed = new URL(formatted);

    // Only allow HTTP/HTTPS
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { isValid: false, error: 'Invalid URL protocol. Only HTTP and HTTPS are permitted.' };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Prevent SSRF: Block internal / private / loopback IP addresses and hostnames
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('169.254.') || // Link-local / Cloud metadata endpoint
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
    ) {
      return { isValid: false, error: 'Access to internal or restricted network resources is forbidden.' };
    }

    // Extract clean root domain
    const cleanDomain = hostname.replace(/^www\./, '');

    return {
      isValid: true,
      normalizedUrl: parsed.origin + parsed.pathname,
      domain: cleanDomain
    };
  } catch (err) {
    return { isValid: false, error: 'Invalid URL format provided.' };
  }
}

/**
 * Sanitizes input string to prevent prompt injection attacks or malicious script injections.
 */
export function sanitizeInputText(text: string): string {
  if (!text) return '';
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/[<>]/g, '');
}

/**
 * Validates whether the provided Company Name matches the provided Website Domain.
 * Prevents retrieving reports when there is a mismatch (e.g., Company="Tesla" but Domain="coursera.org").
 */
export function validateCompanyDomainMatch(companyName: string, websiteUrl: string): { isMatch: boolean; error?: string } {
  if (!companyName.trim() || !websiteUrl.trim()) {
    return { isMatch: true };
  }

  const cleanName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const urlCheck = validateAndNormalizeUrl(websiteUrl);

  if (!urlCheck.isValid || !urlCheck.domain) {
    return { isMatch: false, error: 'Invalid website URL format provided. Please check the URL.' };
  }

  const domainParts = urlCheck.domain.toLowerCase().split('.');
  const rootBrand = domainParts.length > 1 ? domainParts[domainParts.length - 2] : domainParts[0];

  const nameContainsDomain = cleanName.includes(rootBrand);
  const domainContainsName = rootBrand.includes(cleanName);

  const knownAliases: Record<string, string[]> = {
    tesla: ['tesla', 'teslamotors'],
    coursera: ['coursera'],
    zomato: ['zomato'],
    swiggy: ['swiggy'],
    uber: ['uber'],
    ola: ['ola', 'olacabs', 'olaelectric'],
    zoho: ['zoho'],
    freshworks: ['freshworks', 'freshdesk'],
    duolingo: ['duolingo'],
    udemy: ['udemy'],
    delhivery: ['delhivery'],
    amazon: ['amazon', 'aws'],
    apple: ['apple'],
    microsoft: ['microsoft', 'msft']
  };

  let matchedAlias = false;
  for (const [brand, aliases] of Object.entries(knownAliases)) {
    const nameMatchesBrand = cleanName.includes(brand) || aliases.some(a => cleanName.includes(a));
    const domainMatchesBrand = rootBrand.includes(brand) || aliases.some(a => rootBrand.includes(a));
    if (nameMatchesBrand && domainMatchesBrand) {
      matchedAlias = true;
      break;
    }
  }

  if (nameContainsDomain || domainContainsName || matchedAlias) {
    return { isMatch: true };
  }

  return {
    isMatch: false,
    error: `Mismatch Detected: Company Name '${companyName}' does not match website domain '${urlCheck.domain}'. Report generation blocked due to credential mismatch.`
  };
}
