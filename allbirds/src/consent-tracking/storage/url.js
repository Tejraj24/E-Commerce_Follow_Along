/**
 * URL Parameter Parser
 * Handles reading consent data from URL parameters
 */

/**
 * Extracts and parses consent data from URL parameters
 * @returns {Object|undefined} Parsed consent data or undefined if not found
 */
export const fetchConsentFromURL = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const consentParam = params.get('consent');
    
    if (!consentParam) return undefined;
    
    // URL-safe base64 decode
    const decoded = atob(consentParam.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error parsing consent from URL:', error);
    return undefined;
  }
};

/**
 * Generates a URL with consent data as a parameter
 * @param {Object} data Consent data to encode in URL
 * @param {string} baseURL Base URL to append parameters to (defaults to current URL)
 * @returns {string} URL with encoded consent data
 */
export const generateConsentURL = (
  data,
  baseURL = window.location.href.split('?')[0]
) => {
  try {
    const jsonString = JSON.stringify(data);
    // URL-safe base64 encode
    const encoded = btoa(jsonString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    const url = new URL(baseURL);
    url.searchParams.set('consent', encoded);
    
    return url.toString();
  } catch (error) {
    console.error('Error generating consent URL:', error);
    return baseURL;
  }
};
