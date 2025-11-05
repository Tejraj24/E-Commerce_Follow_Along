import { ConsentManager, DataProcessingPurpose } from './consent-tracking/ConsentManager.js';

// Initialize Consent Manager
const consentManager = new ConsentManager({
  cookieName: 'allbirds_consent',
  cookieExpiryDays: 365
});

// DOM Elements
const statusEl = document.getElementById('status');
const btnAcceptAll = document.getElementById('btnAcceptAll');
const btnRejectAll = document.getElementById('btnRejectAll');
const btnShowDetails = document.getElementById('btnShowDetails');
const detailedControls = document.getElementById('detailedControls');
const btnSavePreferences = document.getElementById('btnSavePreferences');
const checkboxes = {
  essential: document.getElementById('cbEssential'),
  analytics: document.getElementById('cbAnalytics'),
  marketing: document.getElementById('cbMarketing'),
  personalization: document.getElementById('cbPersonalization')
};

// Update UI based on current consent
function updateUI() {
  const state = consentManager.getConsentState();
  
  // Update checkboxes
  if (state) {
    checkboxes.analytics.checked = consentManager.hasConsent(DataProcessingPurpose.ANALYTICS);
    checkboxes.marketing.checked = consentManager.hasConsent(DataProcessingPurpose.MARKETING);
    checkboxes.personalization.checked = consentManager.hasConsent(DataProcessingPurpose.PERSONALIZATION);
    
    // Update status display
    statusEl.innerHTML = `
      <strong>Current Consent Status:</strong><br>
      - Analytics: ${consentManager.hasConsent(DataProcessingPurpose.ANALYTICS) ? '✅ Allowed' : '❌ Denied'}<br>
      - Marketing: ${consentManager.hasConsent(DataProcessingPurpose.MARKETING) ? '✅ Allowed' : '❌ Denied'}<br>
      - Personalization: ${consentManager.hasConsent(DataProcessingPurpose.PERSONALIZATION) ? '✅ Allowed' : '❌ Denied'}<br>
      <small>Last updated: ${new Date(state.lastUpdated).toLocaleString()}</small>
    `;
  }
}

// Event Listeners
btnAcceptAll.addEventListener('click', () => {
  consentManager.updateConsent({
    [DataProcessingPurpose.ANALYTICS]: true,
    [DataProcessingPurpose.MARKETING]: true,
    [DataProcessingPurpose.PERSONALIZATION]: true
  });
  updateUI();
});

btnRejectAll.addEventListener('click', () => {
  consentManager.updateConsent({
    [DataProcessingPurpose.ANALYTICS]: false,
    [DataProcessingPurpose.MARKETING]: false,
    [DataProcessingPurpose.PERSONALIZATION]: false
  });
  updateUI();
});

btnShowDetails.addEventListener('click', () => {
  detailedControls.style.display = detailedControls.style.display === 'none' ? 'block' : 'none';
});

btnSavePreferences.addEventListener('click', () => {
  consentManager.updateConsent({
    [DataProcessingPurpose.ANALYTICS]: checkboxes.analytics.checked,
    [DataProcessingPurpose.MARKETING]: checkboxes.marketing.checked,
    [DataProcessingPurpose.PERSONALIZATION]: checkboxes.personalization.checked
  });
  updateUI();
  detailedControls.style.display = 'none';
});

// Initialize
updateUI();
console.log('Consent Manager Demo Initialized');
console.log('Current consent state:', consentManager.getConsentState());
