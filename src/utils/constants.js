// Centralized constants - single source of truth
export const WHATSAPP_NUMBER = '233536225804';

// Exchange rate loaded at build time from src/data/exchange-rate.json
// Market rate plus Fidelity's selling premium; no extra buffer
// Vite inlines this JSON at build time
import rateData from '../data/exchange-rate.json';
export const USD_GHS_RATE = rateData.rate ?? 11.76;

export const APP_CONFIG = {
  siteTitle: 'IzzyAutoBridge Ghana',
  tagline: 'Direct China Vehicle Supply',
  heroTitle: 'Your car, bridged to Ghana.',
  heroSubtitle:
    'Direct China vehicle imports to Ghana with transparent landed costs and a route you can actually track from port to your driveway.',
  whatsappNumber: '233536225804',
};
