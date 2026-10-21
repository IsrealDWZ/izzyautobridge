// Google Analytics (GA4) — Consent Mode v2
// Defaults everything to denied until user accepts consent
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', 'G-REGLS30J5B', { anonymize_ip: true });
