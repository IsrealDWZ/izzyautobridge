import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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
  const dialogRef = useRef(null);

  useEffect(() => {
    const stored = readStored();
    if (stored === GRANTED || stored === DENIED) {
      applyConsent(stored);
      return;
    }
    setVisible(true);
  }, []);

  // Move focus into the banner when it appears so keyboard and screen-reader
  // users hear the choice without hunting for it at the end of the document.
  useEffect(() => {
    if (!visible) return undefined;
    const id = window.setTimeout(() => dialogRef.current?.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(id);
  }, [visible]);

  const decide = value => {
    writeStored(value);
    applyConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="dialog"
          aria-label="Analytics consent"
          aria-describedby="consent-description"
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-card border border-line rounded-2xl p-5 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-action/40"
        >
          <p id="consent-description" className="text-sm text-main leading-relaxed">
            We use Google Analytics to understand how the site is used. Nothing is shared for ads,
            and you can decline.
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
