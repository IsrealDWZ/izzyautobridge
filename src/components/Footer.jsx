import { Car, Truck, Zap, Shield, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ whatsappNumber = '233244123456' }) {
  const footerLinks = {
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Our Process', href: '#process' },
      { label: 'Trust & Warranty', href: '#trust' },
      { label: 'Careers', href: '#' },
    ],
    support: [
      { label: 'Contact Us', href: `https://wa.me/${whatsappNumber}` },
      { label: 'FAQ', href: '#' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Customs Guide', href: '#' },
    ],
    services: [
      { label: 'Vehicle Import', href: '#' },
      { label: 'Fleet Solutions', href: '#' },
      { label: 'EV Consulting', href: '#' },
      { label: 'Path 02: Fly & Pick', href: '#concierge' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Warranty Terms', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: MessageCircle, href: `https://wa.me/${whatsappNumber}`, label: 'WhatsApp' },
    { icon: Car, href: '#', label: 'Instagram' },
    { icon: Truck, href: '#', label: 'Facebook' },
    { icon: Zap, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12"
        >
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Car size={28} className="text-gold" />
              <span className="font-display font-bold text-xl">IzzyAutoBridge</span>
            </div>
            <p className="text-white/60 mb-6 max-w-xs">
              Direct China vehicle supply to Ghana. Transparent landed costs. 60-day delivery. 12-month warranty.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-gold hover:text-navy hover:border-gold transition-all"
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
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-white/70 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
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
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} IzzyAutoBridge Ghana Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
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