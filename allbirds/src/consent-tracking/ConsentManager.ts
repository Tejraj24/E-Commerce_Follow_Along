import { 
  ConsentStorage, 
  DataProcessingPurpose,
  ConsentDisplayKeys,
  DisplayConsentValues,
  StorageVersion,
  ConsentAPIOptions
} from './types';
import { readCookie, writeCookie } from './storage/cookie';
import { fetchConsentFromURL, generateConsentURL } from './storage/url';

const DEFAULT_OPTIONS: Required<ConsentAPIOptions> = {
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
  private options: Required<ConsentAPIOptions>;
  private storage: ConsentStorage | null = null;

  constructor(options: ConsentAPIOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    
    if (this.options.autoLoad) {
      this.loadConsent();
    }
  }

  /**
   * Loads consent from available storage sources
   */
  public loadConsent(): void {
    // Try URL parameters first (highest priority)
    this.storage = fetchConsentFromURL() || 
                   readCookie(this.options.cookieName) || 
                   this.getDefaultConsent();
    
    this.persistConsent();
  }

  /**
   * Updates consent for specific purposes
   */
  public updateConsent(
    purposes: Partial<Record<DataProcessingPurpose, boolean>>,
    updateTimestamp: boolean = true
  ): void {
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
  public hasConsent(purpose: DataProcessingPurpose): boolean {
    if (!this.storage) return false;
    return !!this.storage.purposes[purpose];
  }

  /**
   * Marks a UI element as shown to the user
   */
  public markDisplayed(displayKey: ConsentDisplayKeys): void {
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
  public wasDisplayed(displayKey: ConsentDisplayKeys): boolean {
    return this.storage?.displayState?.[displayKey] === DisplayConsentValues.SHOWN;
  }

  /**
   * Generates a URL with the current consent state
   */
  public generateConsentURL(baseURL: string = window.location.href): string {
    return generateConsentURL(this.storage || this.getDefaultConsent(), baseURL);
  }

  /**
   * Returns the current consent state
   */
  public getConsentState(): ConsentStorage | null {
    return this.storage ? { ...this.storage } : null;
  }

  /**
   * Resets consent to default values
   */
  public resetConsent(): void {
    this.storage = this.getDefaultConsent();
    this.persistConsent();
  }

  /**
   * Persists the current consent state to all configured storage backends
   */
  private persistConsent(): void {
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
  private getDefaultConsent(): ConsentStorage {
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
