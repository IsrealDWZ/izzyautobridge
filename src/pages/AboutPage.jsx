import { useEffect } from 'react';

import ComparisonSection from '../components/ComparisonSection';
import ConciergeForm from '../components/ConciergeForm';
import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import ShowcaseVideo from '../components/ShowcaseVideo';
import StatsRow from '../components/StatsRow';
import TrustSection from '../components/TrustSection';
import vehicles from '../data/vehicles';
import { APP_CONFIG, WHATSAPP_NUMBER } from '../utils/constants';
import { seasonHeroLine } from '../utils/season';

const heroSubtitle =
  'Direct China vehicle imports to Ghana with transparent landed costs — free shipping to Tema included — and a route you can actually track from port to your driveway.';

export default function AboutPage() {
  // Festive season copy: a real price statement only while prices are
  // actually cut (season.js resolves the phase from today's date).
  const heroWithSeason = seasonHeroLine()
    ? `${heroSubtitle} ${seasonHeroLine()}`
    : heroSubtitle;
  useEffect(() => {
    document.title = 'About Us — IzzyAutoBridge Ghana';
  }, []);

  return (
    <>
      {/* Hero */}
      <Hero title={APP_CONFIG.heroTitle} subtitle={heroWithSeason} />

      {/* Stats Row */}
      <StatsRow vehicles={vehicles} />

      {/* Trust Section */}
      <TrustSection />

      {/* Showcase Video */}
      <ShowcaseVideo />

      {/* Process Section */}
      <ProcessSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Concierge Form */}
      <ConciergeForm vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
    </>
  );
}
