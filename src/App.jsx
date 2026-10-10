import { motion } from 'framer-motion';
import { Ship, Moon, Sun } from 'lucide-react';
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
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
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

  // Auto-hide scrollbar: show the thumb while scrolling, hide it ~700ms after
  // the last scroll event (CSS in index.css keys off html.is-scrolling).
  useEffect(() => {
    const el = document.documentElement;
    let timer;
    const onScroll = () => {
      el.classList.add('is-scrolling');
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove('is-scrolling'), 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-primary text-main transition-colors">
        <ScrollProgress />
        <ScrollManager />

        <div className="fixed top-0 inset-x-0 z-30">
          <motion.div
            initial={{ y: -48 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="bg-secondary text-onsecondary py-2 overflow-hidden"
          >
            <Marquee
              items={shipItems}
              duration={40}
              gap="gap-12"
              itemClassName="text-xs sm:text-sm font-bold uppercase tracking-wider"
            />
          </motion.div>
          <nav className="flex items-center justify-between pl-4 pr-3 sm:px-6 py-3 bg-secondary">
            <div className="flex items-center gap-2 sm:gap-5">
              <Link
                to="/"
                className="font-display font-bold text-onsecondary text-[15px] sm:text-xl whitespace-nowrap"
              >
                {APP_CONFIG.siteTitle}
              </Link>
              <NavLink
                to="/inventory"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-semibold uppercase tracking-wide transition-colors whitespace-nowrap px-1 -mb-1 border-b-2 ${
                    isActive
                      ? 'text-onsecondary border-onsecondary'
                      : 'text-onsecondary-muted border-transparent hover:text-onsecondary hover:border-accent-hover hover:bg-accent-hover/20'
                  }`
                }
              >
                Inventory
              </NavLink>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-xs sm:text-sm bg-card border border-subtle text-main px-1 sm:px-3 py-2 rounded-full min-h-[44px] min-w-[44px] whitespace-nowrap shrink-0 hover:bg-accent-hover/20 transition-colors"
            >
              {theme === 'light' ? <><Moon size={13} /> Dark</> : <><Sun size={13} /> Light</>}
            </button>
          </nav>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/vehicle/:slug" element={<VehicleDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
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
