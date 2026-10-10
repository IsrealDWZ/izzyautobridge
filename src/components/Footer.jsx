import { motion } from 'framer-motion';
import { Car, Shield, Zap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { WHATSAPP_NUMBER } from '../utils/constants';

const footerLinks = {
  explore: [
    { label: 'Browse Inventory', to: '/inventory' },
    { label: 'Our Process', to: '/#process' },
    { label: 'Trust & Warranty', to: '/#trust' },
    { label: 'Request a Vehicle', to: '/#concierge' },
  ],
  support: [
    { label: 'Contact Us', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Warranty Terms', to: '/terms#warranty' },
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-onsecondary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12"
        >
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Car size={28} className="text-action" />
              <span className="font-display font-bold text-xl">IzzyAutoBridge</span>
            </div>
            <p className="text-onsecondary-muted mb-6 max-w-xs">
              Direct China vehicle supply to Ghana. Transparent landed costs. 60-day delivery. 12-month warranty.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-primary border border-subtle rounded-full flex items-center justify-center text-onsecondary hover:bg-accent-hover hover:text-white hover:border-accent-hover transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-onsecondary-muted hover:text-onsecondary hover:underline hover:decoration-accent-hover hover:decoration-2 underline-offset-4 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="text-onsecondary-muted hover:text-onsecondary hover:underline hover:decoration-accent-hover hover:decoration-2 underline-offset-4 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="border-t border-subtle pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-onsecondary-muted text-sm">
              © {new Date().getFullYear()} IzzyAutoBridge Ghana Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-onsecondary-muted">
              <span className="flex items-center gap-1.5">
                <Shield size={14} /> DVLA Class C Licensed
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={14} /> EV Ready
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle size={14} /> WhatsApp Support
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}