/**
 * Consent Tracking Types
 * Defines the core types and interfaces for the consent tracking system.
 */

export enum ConsentValues {
  ACCEPTED = '1',
  DENIED = '0',
  NOT_SET = ''
}

export enum ConsentKeys {
  TRACKING = 'tracking_consent',
  MARKETING = 'marketing_consent',
  ANALYTICS = 'analytics_consent',
  PREFERENCES = 'preferences_consent'
}

export enum StorageVersion {
  V2 = 'v2',
  V3 = 'v3'
}

export enum DataProcessingPurpose {
  ESSENTIAL = 'essential',
  ANALYTICS = 'analytics',
  MARKETING = 'marketing',
  PERSONALIZATION = 'personalization'
}

export enum DisplayConsentValues {
  SHOWN = '1',
  NOT_SHOWN = '0'
}

export enum ConsentDisplayKeys {
  BANNER = 'consent_banner_shown',
  PREFERENCES = 'consent_preferences_shown'
}

export interface ConsentStorage {
  version: StorageVersion;
  purposes: {
    [key in DataProcessingPurpose]?: boolean;
  };
  lastUpdated: string;
  displayState?: {
    [key in ConsentDisplayKeys]?: DisplayConsentValues;
  };
}

export interface ConsentAPIOptions {
  cookieDomain?: string;
  cookieName?: string;
  cookieExpiryDays?: number;
  autoLoad?: boolean;
}
