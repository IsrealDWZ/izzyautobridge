import Hero from './components/Hero';
import VehicleGrid from './components/VehicleGrid';
import CompareModal from './components/CompareModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import FilterSidebar from './components/FilterSidebar';
import EVCalculator from './components/EVCalculator';
import TrustSection from './components/TrustSection';
import ProcessSection from './components/ProcessSection';
import ComparisonSection from './components/ComparisonSection';
import ConciergeForm from './components/ConciergeForm';
import StatsRow from './components/StatsRow';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { useAppStore } from './store/useAppStore';
import vehicles from './data/vehicles.json';
import { WHATSAPP_NUMBER, APP_CONFIG } from './utils/constants';

export default function App() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-navy-dark text-navy dark:text-white transition-colors">
        <nav className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3">
          <span className="font-display font-bold text-white text-lg sm:text-xl">{APP_CONFIG.siteTitle}</span>
          <button
            onClick={toggleTheme}
            className="text-xs sm:text-sm bg-white/10 border border-white/20 text-white px-3 py-2 rounded-full min-h-[44px] min-w-[44px]"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16">
          {/* Hero */}
          <Hero title={APP_CONFIG.heroTitle} subtitle={APP_CONFIG.heroSubtitle} />

          {/* Stats Row */}
          <StatsRow vehicles={vehicles} />

          {/* Trust Section */}
          <TrustSection />

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