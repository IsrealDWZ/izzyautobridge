import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'iza_consent';
const GRANTED = 'granted';
const DENIED = 'denied';

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStored(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore storage errors (private mode) */
  }
}

function applyConsent(value) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored === GRANTED || stored === DENIED) {
      applyConsent(stored);
      return;
    }
    setVisible(true);
  }, []);

  const decide = (value) => {
    writeStored(value);
    applyConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="dialog"
          aria-live="polite"
          aria-label="Analytics consent"
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-card border border-line rounded-2xl p-5 shadow-xl"
        >
          <p className="text-sm text-main leading-relaxed">
            We use Google Analytics to understand how the site is used. Nothing is shared
            for ads, and you can decline.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => decide(GRANTED)}
              className="flex-1 bg-action text-onaction rounded-full px-4 py-2.5 text-sm font-semibold hover:opacity-85 transition min-h-[44px]"
            >
              Accept
            </button>
            <button
              onClick={() => decide(DENIED)}
              className="flex-1 border border-line text-main rounded-full px-4 py-2.5 text-sm font-semibold hover:opacity-85 transition min-h-[44px]"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
