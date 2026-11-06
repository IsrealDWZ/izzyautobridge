import { Analytics } from '@vercel/analytics/react';
import { motion } from 'framer-motion';
import { Ship, Moon, Sun, Gift, Snowflake } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';

import BrandMark from './components/BrandMark';
import CompareModal from './components/CompareModal';
import ConsentBanner from './components/ConsentBanner';
import FavoritesDrawer from './components/FavoritesDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import ScrollProgress from './components/ScrollProgress';
import vehicles from './data/vehicles';
import AboutPage from './pages/AboutPage';
import ComparePage from './pages/ComparePage';
import InventoryPage from './pages/InventoryPage';
import NotFound from './pages/NotFound';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import { useAppStore } from './store/useAppStore';
import { trackPageView } from './utils/analytics';
import { APP_CONFIG, WHATSAPP_NUMBER } from './utils/constants';
import { currentSeason, seasonMarqueeItems, uiNow } from './utils/season';

const shipItems = Array.from({ length: 6 }, (_, i) => (
  <span key={i} className="flex items-center gap-2">
    <Ship size={15} aria-hidden="true" />
    Free shipping — CIF Tema port delivery included on every vehicle
  </span>
));

const navLinkClass = isActive =>
  `text-xs sm:text-sm font-semibold uppercase tracking-wide transition-colors whitespace-nowrap px-1 -mb-1 border-b-2 ${
    isActive
      ? 'text-onsecondary border-onsecondary'
      : 'text-onsecondary-muted border-transparent hover:text-onsecondary hover:border-accent-hover hover:bg-accent-hover/20'
  }`;

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
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);
  const season = currentSeason(uiNow());
  const seasonVisuals = season === 'anticipation' || season === 'festive';
  const marqueeItemsRaw = seasonMarqueeItems(uiNow());
  const SeasonItemIcon = season === 'festive' ? Gift : Snowflake;
  // Season marquee items are plain strings; wrap each into a JSX node with a
  // small icon prefix. JSX nodes can't be join()-ed, so the sr-only copy
  // reuses the raw strings.
  const seasonItems = marqueeItemsRaw.map((text) => (
    <span key={text} className="inline-flex items-center gap-2">
      <SeasonItemIcon size={14} aria-hidden="true" />
      {text}
    </span>
  ));
  const marqueeItems = marqueeItemsRaw.length > 0 ? seasonItems : shipItems;
  // gtag's config call already records the landing page_view. Every later SPA
  // navigation needs its own hit, otherwise GA4 only ever sees the entry page.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }
    // Defer a tick so the destination page has set document.title.
    const timer = setTimeout(() => trackPageView(pathname, document.title), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Seasonal visuals hang off html.season-festive (tokens in index.css), so
  // the whole festive look ships and reverts with one class per phase.
  useEffect(() => {
    document.documentElement.classList.toggle('season-festive', seasonVisuals);
  }, [seasonVisuals]);

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
            className={`py-2 overflow-hidden ${
              currentSeason(uiNow()) === 'festive'
                ? 'bg-festive text-onfestive'
                : 'bg-secondary text-onsecondary'
            }`}
          >
            <Marquee
              items={marqueeItems}
              duration={40}
              gap="gap-12"
              itemClassName="text-xs sm:text-sm font-bold uppercase tracking-wider"
            />
            {/* The moving track is aria-hidden, so the season notice needs a
                static copy for screen readers. */}
            {marqueeItemsRaw.length > 0 && (
              <p className="sr-only">{marqueeItemsRaw.join('. ')}</p>
            )}
          </motion.div>
          <nav className="flex items-center justify-between pl-4 pr-3 sm:px-6 py-3 bg-secondary">
            <div className="flex items-center gap-2 sm:gap-5">
              <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
                <BrandMark size={38} className="text-onsecondary" />
                <span className="hidden sm:inline font-display font-bold text-onsecondary text-[15px] sm:text-xl">
                  {APP_CONFIG.siteTitle}
                </span>
              </Link>
              <Link
                to="/"
                aria-current={pathname === '/' || pathname === '/inventory' ? 'page' : undefined}
                className={navLinkClass(pathname === '/' || pathname === '/inventory')}
              >
                Inventory
              </Link>
              <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>
                About
              </NavLink>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-xs sm:text-sm bg-card border border-subtle text-main px-1 sm:px-3 py-2 rounded-full min-h-[44px] min-w-[44px] whitespace-nowrap shrink-0 hover:bg-accent-hover/20 transition-colors"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={13} /> Dark
                </>
              ) : (
                <>
                  <Sun size={13} /> Light
                </>
              )}
            </button>
          </nav>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
          <Routes>
            <Route path="/" element={<InventoryPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/vehicle/:slug" element={<VehicleDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />

        <CompareModal vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
        <FavoritesDrawer vehicles={vehicles} whatsappNumber={WHATSAPP_NUMBER} />
        <FloatingWhatsApp whatsappNumber={WHATSAPP_NUMBER} />
        <ConsentBanner />
        {/* Cookieless page views + referrers, so traffic still counts when the
            visitor declines GA4 consent. Needs Analytics enabled in Vercel. */}
        <Analytics />
      </div>
    </div>
  );
}
