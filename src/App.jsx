import { useEffect } from 'react';

import CompareModal from './components/CompareModal';
import ConciergeForm from './components/ConciergeForm';
import EVCalculator from './components/EVCalculator';
import FavoritesDrawer from './components/FavoritesDrawer';
import FilterSidebar from './components/FilterSidebar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProcessSection from './components/ProcessSection';
import StatsRow from './components/StatsRow';
import TrustSection from './components/TrustSection';
import VehicleGrid from './components/VehicleGrid';
import vehicles from './data/vehicles.json';
import { useAppStore } from './store/useAppStore';
import { WHATSAPP_NUMBER, APP_CONFIG } from './utils/constants';

export default function App() {
  const { theme, toggleTheme } = useAppStore();
  const heroSubtitle = 'Direct China vehicle imports to Ghana with transparent landed costs and a route you can actually track from port to your driveway.';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-bg text-text antialiased">
      <nav className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-bg/80 backdrop-blur-md border-b border-border">
        <span className="font-display font-bold text-white text-lg sm:text-xl">{APP_CONFIG.siteTitle}</span>
        <button
          onClick={toggleTheme}
          className="text-xs sm:text-sm bg-bg-elevated border border-border text-white px-3 py-2 rounded-full min-h-[44px] min-w-[44px] hover:bg-bg-hover hover:border-accent-dim transition-all"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Hero */}
        <Hero title={APP_CONFIG.heroTitle} subtitle={heroSubtitle} />

        {/* Stats Row */}
        <StatsRow vehicles={vehicles} />

        {/* Trust Section */}
        <TrustSection />

        {/* Process Section */}
        <ProcessSection />

        {/* EV Calculator */}
        <EVCalculator />

        {/* Concierge Form */}
        <ConciergeForm vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />

        {/* Inventory Grid with Filters */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <FilterSidebar vehicles={vehicles} />
          <div className="flex-1 min-w-0 w-full">
            <VehicleGrid vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
          </div>
        </div>

        {/* Modals & Drawers */}
        <CompareModal vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
        <FavoritesDrawer vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />

        {/* Floating Elements */}
        <FloatingWhatsApp whatsappNumber={WHATSAPP_NUMBER} />
      </main>

      <Footer />
    </div>
  );
}