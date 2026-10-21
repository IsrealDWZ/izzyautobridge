import { useEffect } from 'react';

import LandingHero from '../components/LandingHero';
import LandingVehicleGrid from '../components/LandingVehicleGrid';
import LandingTools from '../components/LandingTools';
import LandingDiscover from '../components/LandingDiscover';
import LandingFooter from '../components/LandingFooter';

export default function HomePage() {
  useEffect(() => {
    document.title = 'IzzyAutoBridge Ghana — Direct China Vehicle Supply';
  }, []);

  return (
    <>
      <LandingHero />
      <LandingVehicleGrid />
      <LandingTools />
      <LandingDiscover />
      <LandingFooter />
    </>
  );
}
