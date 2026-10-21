import { useEffect } from 'react';

import ComparisonSection from '../components/ComparisonSection';
import ConciergeForm from '../components/ConciergeForm';
import EVCalculator from '../components/EVCalculator';
import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import ShowcaseVideo from '../components/ShowcaseVideo';
import StatsRow from '../components/StatsRow';
import TrustSection from '../components/TrustSection';
import vehicles from '../data/vehicles.json';
import { APP_CONFIG, WHATSAPP_NUMBER } from '../utils/constants';

const heroSubtitle =
  'Direct China vehicle imports to Ghana with transparent landed costs — free shipping to Tema included — and a route you can actually track from port to your driveway.';

export default function HomePage() {
  useEffect(() => {
    document.title = 'IzzyAutoBridge Ghana — Direct China Vehicle Supply';
  }, []);

  return (
    <>
      {/* Hero */}
      <Hero title={APP_CONFIG.heroTitle} subtitle={heroSubtitle} />

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

      {/* EV Calculator */}
      <EVCalculator />

      {/* Concierge Form */}
      <ConciergeForm vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
    </>
  );
}
