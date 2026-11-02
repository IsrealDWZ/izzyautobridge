// Google Analytics (GA4) — Consent Mode v2
// Defaults everything to denied until user accepts consent.
//
// This file is loaded as a module, so a bare `function gtag()` would stay
// module-scoped. The queue pusher must be exposed on window: gtag.js reads it,
// ConsentBanner calls it, and src/utils/analytics.js sends events through it.
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() {
  window.dataLayer.push(arguments);
};

window.gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500,
});
window.gtag('js', new Date());
window.gtag('config', 'G-REGLS30J5B', { anonymize_ip: true });
