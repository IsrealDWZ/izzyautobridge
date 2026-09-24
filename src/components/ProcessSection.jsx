import { motion } from 'framer-motion';
import { Search, DollarSign, Truck, Key, CheckCircle, Shield, Clock, Globe } from 'lucide-react';

import { Background } from './Background';

const steps = [
  {
    num: '1',
    icon: Search,
    title: 'Choose Your Vehicle',
    desc: 'Browse 169+ inspected vehicles with transparent landed costs. Filter by brand, fuel, body type, budget. Or request a specific model — we source it.',
  },
  {
    num: '2',
    icon: DollarSign,
    title: 'Full Payment & Proforma',
    desc: 'Proforma issued with full landed cost breakdown. Vehicle secured only upon full payment. No deposits, no installments.',
  },
  {
    num: '3',
    icon: Truck,
    title: 'We Ship — You Track',
    desc: 'Friend sources, SGS inspects, ships CIF Tema (60 days). You get video loading proof, Bill of Lading, all docs via WhatsApp before vessel arrives.',
  },
  {
    num: '4',
    icon: Key,
    title: 'Clear & Drive',
    desc: 'Your agent clears (we supply docs) or we clear for GH₵4,000. DVLA registration, delivery to your door. 12-month warranty starts.',
  },
];

const trustIndicators = [
  { icon: CheckCircle, label: 'SGS Inspected' },
  { icon: Shield, label: 'DVLA Licensed' },
  { icon: Clock, label: '60-Day ETA' },
  { icon: Globe, label: 'Global Shipping' },
];

export default function ProcessSection() {
  return (
    <section className="container-custom section-padding relative">
      <Background variant="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge badge-accent px-4 py-2 text-sm"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4 text-balance"
          >
            Four steps from selection to your driveway — transparent, tracked, supported
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto"
          >
            No hidden steps. No surprises. You're in control the entire way.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {steps.map((step, i) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative card card-hover p-6 group"
            >
              <motion.div
                className="absolute -top-7 left-6 w-14 h-14 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-strong)] text-[var(--color-bg)] rounded-full flex items-center justify-center font-extrabold text-xl shadow-[0_8px_20px_rgba(212,168,67,0.3)]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
              >
                {step.num}
              </motion.div>
              <div className="pt-6">
                <motion.div
                  className="w-14 h-14 bg-[var(--color-accent-glow)] text-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-4"
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                >
                  <step.icon size={30} strokeWidth={2} />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-display font-bold text-lg text-white mb-2"
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-sm text-[var(--color-text-muted)] leading-relaxed"
                >
                  {step.desc}
                </motion.p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {trustIndicators.map((indicator, i) => (
            <motion.div
              key={indicator.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
              className="card p-4 text-center hover:border-[var(--color-accent-dim)] hover:shadow-lg transition-all"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                className="w-12 h-12 bg-[var(--color-accent-glow)] text-[var(--color-accent)] rounded-xl flex items-center justify-center mx-auto mb-3"
              >
                <indicator.icon size={24} strokeWidth={2} />
              </motion.div>
              <p className="font-medium text-white text-sm">{indicator.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Background>
    </section>
  );
}