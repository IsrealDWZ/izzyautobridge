import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

import { WHATSAPP_NUMBER } from '../utils/constants';

export default function FloatingWhatsApp({ _whatsappNumber = WHATSAPP_NUMBER }) {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20IzzyAutoBridge%2C%20I%27d%20like%20to%20inquire%20about%20your%20vehicles.`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: 6 }}
        whileTap={{ scale: 0.95, rotate: -6 }}
        className="bg-[var(--color-whatsapp)] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] min-h-[48px] min-w-[48px]"
        animate={{ scale: [1, 1.05, 1], boxShadow: ['0 8px 30px rgba(37,211,102,0.4)', '0 12px 40px rgba(37,211,102,0.6)', '0 8px 30px rgba(37,211,102,0.4)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={30} strokeWidth={2} />
        <motion.span
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[var(--color-danger)] text-white text-xs font-bold rounded-full flex items-center justify-center"
        >
          1
        </motion.span>
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap opacity-0 pointer-events-none hidden lg:block group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300"
        style={{ transformOrigin: 'right center' }}
      >
        <span className="flex items-center gap-2 text-white">
          <Send size={16} strokeWidth={2} />
          Chat on WhatsApp
        </span>
      </motion.div>
    </motion.a>
  );
}