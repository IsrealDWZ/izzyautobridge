import { motion } from 'framer-motion';
import { Ship } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import CompareModal from './components/CompareModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import ScrollProgress from './components/ScrollProgress';
import vehicles from './data/vehicles.json';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import { useAppStore } from './store/useAppStore';
import { APP_CONFIG, WHATSAPP_NUMBER } from './utils/constants';

const shipItems = Array.from({ length: 6 }, (_, i) => (
  <span key={i} className="flex items-center gap-2">
    <Ship size={15} aria-hidden="true" />
    Free shipping — CIF Tema port delivery included on every vehicle
  </span>
));

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { theme, toggleTheme } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-navy-dark text-navy dark:text-white transition-colors">
        <ScrollProgress />
        <ScrollManager />

        <div className="fixed top-0 inset-x-0 z-30">
          <motion.div
            initial={{ y: -48 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="bg-gold text-navy py-2 overflow-hidden"
          >
            <Marquee
              items={shipItems}
              duration={40}
              gap="gap-12"
              itemClassName="text-xs sm:text-sm font-bold uppercase tracking-wider"
            />
          </motion.div>
          <nav className="flex items-center gap-2 sm:gap-5 px-4 sm:px-6 py-3 bg-white dark:bg-black">
            <Link
              to="/"
              className="font-display font-bold text-navy dark:text-white text-base sm:text-xl whitespace-nowrap"
            >
              {APP_CONFIG.siteTitle}
            </Link>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `text-xs sm:text-sm font-semibold uppercase tracking-wide transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-gold'
                    : 'text-navy/60 dark:text-white/60 hover:text-gold'
                }`
              }
            >
              Inventory
            </NavLink>
            <button
              onClick={toggleTheme}
              className="text-xs sm:text-sm bg-white border border-navy/20 text-navy dark:bg-white/10 dark:border-white/20 dark:text-white px-2 sm:px-3 py-2 rounded-full min-h-[44px] min-w-[44px] whitespace-nowrap shrink-0"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        <CompareModal vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
        <FavoritesDrawer vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
        <FloatingWhatsApp whatsappNumber={WHATSAPP_NUMBER} />
      </div>
    </div>
  );
}
