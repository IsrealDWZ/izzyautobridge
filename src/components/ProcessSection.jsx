import { motion } from 'framer-motion';
import { Search, DollarSign, Truck, Key } from 'lucide-react';

const steps = [
  {
    num: '1',
    icon: Search,
    title: 'Choose Your Vehicle',
    desc: 'Browse 70+ inspected vehicles with transparent landed costs. Filter by brand, fuel, body type, budget. Or request a specific model — we source it.',
  },
  {
    num: '2',
    icon: DollarSign,
    title: 'Secure with 20% Deposit',
    desc: 'Proforma issued with full cost breakdown. Deposit locks your allocation. Balance due before vehicle release at Tema.',
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

export default function ProcessSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-navy-deep/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold/15 text-navy dark:text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            How It Works
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Four steps from selection to your driveway — transparent, tracked, supported
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            No hidden steps. No surprises. You\'re in control the entire way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative card-surface p-6 hover:border-gold/50 hover:shadow-xl transition-all"
            >
              <div className="absolute -top-6 left-6 w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center font-bold text-xl">
                {step.num}
              </div>
              <div className="pt-4">
                <div className="w-12 h-12 bg-gold/15 text-navy dark:text-gold rounded-xl flex items-center justify-center mb-4">
                  <step.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}