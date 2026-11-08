import { motion } from 'framer-motion';
import { Shield, Zap, MessageCircle, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

import { trackEvent, trackWhatsApp } from '../utils/analytics';
import { WHATSAPP_CHANNEL_URL, WHATSAPP_NUMBER } from '../utils/constants';
import { currentSeason, uiNow } from '../utils/season';

import BrandMark from './BrandMark';
import ExchangeRateNote from './ExchangeRateNote';
import FestiveTree from './season/FestiveTree';

const footerLinks = {
  explore: [
    { label: 'Browse Inventory', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Our Process', to: '/#process' },
    { label: 'Why Us', to: '/about#trust' },
    { label: 'Request a Vehicle', to: '/about#concierge' },
  ],
  support: [
    { label: 'Contact Us', href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { label: 'WhatsApp Channel', href: WHATSAPP_CHANNEL_URL, track: 'channel' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp' },
  {
    icon: Megaphone,
    href: WHATSAPP_CHANNEL_URL,
    label: 'WhatsApp Channel',
    track: 'channel',
  },
];

function supportLinkClick(link) {
  if (link.track === 'channel') {
    return () => trackEvent('whatsapp_channel_click', { placement: 'footer' });
  }
  if (link.href.includes('wa.me')) {
    return () => trackWhatsApp('footer', null, { placement: 'support_link' });
  }
  return undefined;
}

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
              <BrandMark size={38} className="text-action" />
              <span className="font-display font-bold text-xl">IzzyAutoBridge</span>
            </div>
            <p className="text-onsecondary-muted mb-6 max-w-xs">
              Direct China vehicle supply to Ghana. Transparent pricing. 60-day delivery.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  onClick={() =>
                    social.track === 'channel'
                      ? trackEvent('whatsapp_channel_click', { placement: 'social_icon' })
                      : trackWhatsApp('footer', null, { placement: 'social_icon' })
                  }
                  className="w-10 h-10 bg-whatsapp text-onwhatsapp border border-transparent rounded-full flex items-center justify-center hover:opacity-85 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-2">
                {links.map(link => (
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
                        onClick={supportLinkClick(link)}
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

        {/* Festive greeting — date-driven via season.js, gone by 3 Jan. */}
        {currentSeason(uiNow()) === 'festive' && (
          <div className="mb-10 flex items-center gap-3 font-display text-sm font-semibold">
            <FestiveTree className="w-6 h-8 shrink-0" />
            <span>
              Merry Christmas from IzzyAutoBridge. Festive prices run through
              31&nbsp;December.
            </span>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="border-t border-subtle pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-onsecondary-muted text-sm">
                © {new Date().getFullYear()} IzzyAutoBridge Ghana Ltd. All rights reserved.
              </p>
              <ExchangeRateNote className="text-onsecondary-muted mt-2" />
            </div>
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
