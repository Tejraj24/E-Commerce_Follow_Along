import { 
  DataProcessingPurpose,
  ConsentDisplayKeys,
  DisplayConsentValues,
  StorageVersion
} from './types/index.js';
import { readCookie, writeCookie } from './storage/cookie.js';
import { fetchConsentFromURL, generateConsentURL } from './storage/url.js';

const DEFAULT_OPTIONS = {
  cookieDomain: '',
  cookieName: 'consent_preferences',
  cookieExpiryDays: 365,
  autoLoad: true,
};

/**
 * Consent Manager
 * Manages user consent preferences with support for multiple storage backends
 */
export class ConsentManager {
  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.storage = null;
    
    if (this.options.autoLoad) {
      this.loadConsent();
    }
  }

  /**
   * Loads consent from available storage sources
   */
  loadConsent() {
    // Try URL parameters first (highest priority)
    this.storage = fetchConsentFromURL() || 
                   readCookie(this.options.cookieName) || 
                   this.getDefaultConsent();
    
    this.persistConsent();
  }

  /**
   * Updates consent for specific purposes
   */
  updateConsent(purposes, updateTimestamp = true) {
    if (!this.storage) {
      this.storage = this.getDefaultConsent();
    }

    this.storage.purposes = {
      ...this.storage.purposes,
      ...purposes
    };

    if (updateTimestamp) {
      this.storage.lastUpdated = new Date().toISOString();
    }

    this.persistConsent();
  }

  /**
   * Checks if consent is given for a specific purpose
   */
  hasConsent(purpose) {
    if (!this.storage) return false;
    return !!this.storage.purposes[purpose];
  }

  /**
   * Marks a UI element as shown to the user
   */
  markDisplayed(displayKey) {
    if (!this.storage) {
      this.storage = this.getDefaultConsent();
    }

    if (!this.storage.displayState) {
      this.storage.displayState = {};
    }

    this.storage.displayState[displayKey] = DisplayConsentValues.SHOWN;
    this.persistConsent();
  }

  /**
   * Checks if a UI element has been shown to the user
   */
  wasDisplayed(displayKey) {
    return this.storage?.displayState?.[displayKey] === DisplayConsentValues.SHOWN;
  }

  /**
   * Generates a URL with the current consent state
   */
  generateConsentURL(baseURL = window.location.href) {
    return generateConsentURL(this.storage || this.getDefaultConsent(), baseURL);
  }

  /**
   * Returns the current consent state
   */
  getConsentState() {
    return this.storage ? { ...this.storage } : null;
  }

  /**
   * Resets consent to default values
   */
  resetConsent() {
    this.storage = this.getDefaultConsent();
    this.persistConsent();
  }

  /**
   * Persists the current consent state to all configured storage backends
   */
  persistConsent() {
    if (!this.storage) return;

    // Always update the version to current
    this.storage.version = StorageVersion.V3;
    
    // Write to cookie
    writeCookie(
      this.storage,
      this.options.cookieName,
      this.options.cookieExpiryDays
    );
  }

  /**
   * Returns default consent values
   */
  getDefaultConsent() {
    const now = new Date().toISOString();
    
    return {
      version: StorageVersion.V3,
      purposes: {
        [DataProcessingPurpose.ESSENTIAL]: true, // Essential cookies are enabled by default
        [DataProcessingPurpose.ANALYTICS]: false,
        [DataProcessingPurpose.MARKETING]: false,
        [DataProcessingPurpose.PERSONALIZATION]: false,
      },
      lastUpdated: now,
      displayState: {}
    };
  }
}
