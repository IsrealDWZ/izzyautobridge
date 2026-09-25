import { motion } from 'framer-motion';
import { Car, Truck, Zap, Shield, MessageCircle, MapPin, Clock, Globe, Heart } from 'lucide-react';

import { WHATSAPP_NUMBER } from '../utils/constants';
import { Background } from './Background';

const footerLinks = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Process', href: '#process' },
    { label: 'Trust & Warranty', href: '#trust' },
    { label: 'Careers', href: '#' },
  ],
  support: [
    { label: 'Contact Us', href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { label: 'FAQ', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Customs Guide', href: '#' },
  ],
  services: [
    { label: 'Vehicle Import', href: '#' },
    { label: 'Fleet Solutions', href: '#' },
    { label: 'EV Consulting', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Warranty Terms', href: '#' },
  ],
};

const trustBadges = [
  { icon: Shield, label: 'DVLA Class C Licensed' },
  { icon: Zap, label: 'EV Ready' },
  { icon: MessageCircle, label: 'WhatsApp Support' },
  { icon: MapPin, label: 'Accra, Ghana' },
  { icon: Clock, label: 'Mon-Fri 8AM-5PM' },
  { icon: Globe, label: 'Global Shipping' },
];

const socialLinks = [
  { icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp' },
  { icon: Car, href: '#', label: 'Instagram' },
  { icon: Truck, href: '#', label: 'Facebook' },
  { icon: Zap, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <Background variant="section">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12"
          >
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  animate={{ rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-strong)] rounded-xl flex items-center justify-center"
                >
                  <Car size={28} className="text-[var(--color-bg)]" />
                </motion.div>
                <span className="font-display font-bold text-2xl text-white">IzzyAutoBridge</span>
              </div>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-xs leading-relaxed">
                Direct China vehicle supply to Ghana. Transparent landed costs. 60-day delivery. 12-month warranty.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 bg-[var(--color-container)] border border-[var(--color-border)] rounded-xl flex items-center justify-center text-white/70 hover:text-[var(--color-accent)] hover:border-[var(--color-accent-dim)] hover:bg-[var(--color-bg-hover)] transition-all duration-300"
                  >
                    <social.icon size={20} strokeWidth={2} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {Object.entries(footerLinks).map(([category, links], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + catIndex * 0.05 }}
              >
                <h4 className="font-semibold text-white mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <ul className="space-y-2.5">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + catIndex * 0.05 + linkIndex * 0.03 }}
                    >
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="border-t border-[var(--color-border)] pt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-[var(--color-container)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent-dim)] transition-all"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                    className="w-10 h-10 bg-[var(--color-accent-glow)] text-[var(--color-accent)] rounded-xl flex items-center justify-center"
                  >
                    <badge.icon size={20} strokeWidth={2} />
                  </motion.div>
                  <div>
                    <p className="font-medium text-white text-sm">{badge.label}</p>
                    <p className="text-[var(--color-text-dim)] text-xs">Verified & Active</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[var(--color-text-dim)] text-sm"
              >
                © {new Date().getFullYear()} IzzyAutoBridge Ghana Ltd. All rights reserved.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm text-[var(--color-text-dim)]"
              >
                <span className="flex items-center gap-1.5">
                  <Shield size={14} strokeWidth={2} className="text-[var(--color-accent)]" />
                  DVLA Class C Licensed
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap size={14} strokeWidth={2} className="text-[var(--color-success)]" />
                  EV Ready
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={14} strokeWidth={2} className="text-[var(--color-whatsapp)]" />
                  WhatsApp Support
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Background>
    </footer>
  );
}