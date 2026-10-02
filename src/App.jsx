import { motion } from 'framer-motion';
import { Ship } from 'lucide-react';
import { useEffect } from 'react';

import CompareModal from './components/CompareModal';
import ComparisonSection from './components/ComparisonSection';
import ConciergeForm from './components/ConciergeForm';
import EVCalculator from './components/EVCalculator';
import FavoritesDrawer from './components/FavoritesDrawer';
import FilterSidebar from './components/FilterSidebar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProcessSection from './components/ProcessSection';
import ScrollProgress from './components/ScrollProgress';
import ShowcaseVideo from './components/ShowcaseVideo';
import StatsRow from './components/StatsRow';
import TrustSection from './components/TrustSection';
import VehicleGrid from './components/VehicleGrid';
import vehicles from './data/vehicles.json';
import { useAppStore } from './store/useAppStore';
import { WHATSAPP_NUMBER, APP_CONFIG } from './utils/constants';

export default function App() {
  const { theme, toggleTheme } = useAppStore();
  const heroSubtitle = 'Direct China vehicle imports to Ghana with transparent landed costs — free shipping to Tema included — and a route you can actually track from port to your driveway.';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-navy-dark text-navy dark:text-white transition-colors">
        <ScrollProgress />
        <div className="fixed top-0 inset-x-0 z-30">
          <motion.div
            initial={{ y: -48 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="bg-gold text-navy text-xs sm:text-sm font-bold uppercase tracking-wider py-2 px-4 flex items-center justify-center gap-2 text-center"
          >
            <Ship size={16} className="shrink-0" aria-hidden="true" />
            <span>Free shipping — CIF Tema port delivery included on every vehicle</span>
          </motion.div>
          <nav className="flex items-center justify-between px-4 sm:px-6 py-3">
            <span className="font-display font-bold text-navy dark:text-white text-lg sm:text-xl">
              {APP_CONFIG.siteTitle}
            </span>
            <button
              onClick={toggleTheme}
              className="text-xs sm:text-sm bg-white border border-navy/20 text-navy dark:bg-white/10 dark:border-white/20 dark:text-white px-3 py-2 rounded-full min-h-[44px] min-w-[44px]"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
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
        </div>

        <Footer />
      </div>
    </div>
  );
}