/**
 * GA4 event helpers.
 *
 * gtag.js is loaded in index.html and Consent Mode v2 defaults to denied, so
 * Google decides whether a hit is stored based on the visitor's choice. Every
 * helper is a no-op when gtag is absent (prerender, tests, blocked script), so
 * callers never need to guard.
 */

function send(name, params) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/** Fire a custom GA4 event. */
export function trackEvent(name, params = {}) {
  send(name, params);
}

/** Explicit page_view for SPA route changes (gtag only sends the first one). */
export function trackPageView(path, title) {
  const { origin, search } = window.location;
  send('page_view', {
    page_path: path,
    page_title: title,
    // Drop the hash: /#calculator and / are the same page to GA4.
    page_location: `${origin}${path}${search}`,
  });
}

/** GA4 retail item shape for a vehicle. */
export function toItem(vehicle) {
  return {
    item_id: vehicle.ID,
    item_name: `${vehicle.Brand} ${vehicle.Model} ${vehicle.Year}`,
    item_brand: vehicle.Brand,
    item_category: vehicle.Body_Type,
    item_category2: vehicle.Fuel_Type,
    price: vehicle.Price_GHS,
  };
}

/**
 * The site's real conversion: a tap through to WhatsApp.
 * `source` tells you which surface produced the lead.
 */
export function trackWhatsApp(source, vehicle = null, extra = {}) {
  const params = { source, ...extra };
  if (vehicle) {
    params.item_id = vehicle.ID;
    params.item_name = `${vehicle.Brand} ${vehicle.Model} ${vehicle.Year}`;
    params.value = vehicle.Price_GHS;
    params.currency = 'GHS';
  }
  send('whatsapp_click', params);
}
