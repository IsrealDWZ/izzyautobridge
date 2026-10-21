import { useEffect } from 'react';

import LandingHero from '../components/LandingHero';
import StatsRow from '../components/StatsRow';
import TrustSection from '../components/TrustSection';
import LandingVehicleGrid from '../components/LandingVehicleGrid';
import LandingTools from '../components/LandingTools';
import LandingDiscover from '../components/LandingDiscover';
import LandingFooter from '../components/LandingFooter';
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
      <LandingHero title={APP_CONFIG.heroTitle} subtitle={heroSubtitle} />

      {/* Stats Row */}
      <StatsRow vehicles={vehicles} />

      {/* Trust Section */}
      <TrustSection />

      {/* Vehicle Grid */}
      <LandingVehicleGrid />

      {/* Shopping Tools */}
      <LandingTools />

      {/* Discover */}
      <LandingDiscover />

      {/* Footer */}
      <LandingFooter />
    </>
  );
}
