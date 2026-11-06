import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

import { trackWhatsApp } from '../utils/analytics';
import { WHATSAPP_NUMBER } from '../utils/constants';
import { currentSeason, uiNow } from '../utils/season';

import SantaHat from './season/SantaHat';

export default function FloatingWhatsApp({ _whatsappNumber = WHATSAPP_NUMBER }) {
  const isFestive = currentSeason(uiNow()) === 'festive';
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20IzzyAutoBridge%2C%20I%27d%20like%20to%20inquire%20about%20your%20vehicles.`}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackWhatsApp('floating_button')}
      className="fixed bottom-6 right-6 z-40 bg-whatsapp text-onwhatsapp rounded-full w-14 h-14 flex items-center justify-center shadow-xl min-h-[44px] min-w-[44px] hover:opacity-85 transition"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Chat on WhatsApp"
    >
      {isFestive && (
        <SantaHat className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 w-[52px] h-10 rotate-[18deg] drop-shadow-md" />
      )}
      <MessageCircle size={28} />
      <motion.span
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-onsecondary px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 pointer-events-none hidden sm:block"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        Chat on WhatsApp
      </motion.span>
    </motion.a>
  );
}
