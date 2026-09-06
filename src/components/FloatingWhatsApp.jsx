import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function FloatingWhatsApp({ whatsappNumber = WHATSAPP_NUMBER }) {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20IzzyAutoBridge%2C%20I%27d%20like%20to%20inquire%20about%20your%20vehicles.`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-whatsapp text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl min-h-[44px] min-w-[44px]"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
      <motion.span
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 pointer-events-none hidden sm:block"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        Chat on WhatsApp
      </motion.span>
    </motion.a>
  );
}