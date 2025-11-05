/**
 * Consent Tracking Types
 * Defines the core types and interfaces for the consent tracking system.
 */

export const ConsentValues = Object.freeze({
  ACCEPTED: '1',
  DENIED: '0',
  NOT_SET: ''
});

export const ConsentKeys = Object.freeze({
  TRACKING: 'tracking_consent',
  MARKETING: 'marketing_consent',
  ANALYTICS: 'analytics_consent',
  PREFERENCES: 'preferences_consent'
});

export const StorageVersion = Object.freeze({
  V2: 'v2',
  V3: 'v3'
});

export const DataProcessingPurpose = Object.freeze({
  ESSENTIAL: 'essential',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  PERSONALIZATION: 'personalization'
});

export const DisplayConsentValues = Object.freeze({
  SHOWN: '1',
  NOT_SHOWN: '0'
});

export const ConsentDisplayKeys = Object.freeze({
  BANNER: 'consent_banner_shown',
  PREFERENCES: 'consent_preferences_shown'
});
