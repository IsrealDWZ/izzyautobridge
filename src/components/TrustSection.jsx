import { motion } from 'framer-motion';
import { CheckCircle, Shield, Truck, Wrench, Award, MapPin } from 'lucide-react';

import { Background } from './Background';

const trustItems = [
  {
    num: '01',
    question: 'How do you know the vehicle is real?',
    answer: 'We drive each vehicle ourselves before container loading — actual road test, not a workshop walkaround. SGS inspection at port of loading. Video documentation of every container sent before ship sails.',
    icon: CheckCircle,
  },
  {
    num: '02',
    question: 'Who handles clearance at Tema?',
    answer: 'Your agent (we supply all docs: BL, Commercial Invoice, Packing List, SGS Cert, G-CAP) OR we clear for GH₵4,000 service fee. You choose per order.',
    icon: Truck,
  },
  {
    num: '03',
    question: 'What if it breaks in month four?',
    answer: '12-month limited warranty on engine & transmission (EV: motor/battery). Written on proforma. WhatsApp us — we diagnose, source parts, coordinate repair with partner workshops in Accra/Kumasi.',
    icon: Wrench,
  },
  {
    num: '04',
    question: 'Whose name is on the warranty?',
    answer: 'Ours. IzzyAutoBridge Ghana Ltd is the importer of record. We don\'t disappear at port — we\'re based in Accra, licensed by DVLA (Class C).',
    icon: Shield,
  },
  {
    num: '05',
    question: 'Can I inspect before buying?',
    answer: 'We arrange pre-shipment inspection videos and SGS certification. Live video calls available from our Foshan yard before container loads.',
    icon: MapPin,
  },
  {
    num: '06',
    question: 'Have you been to Ghana?',
    answer: 'Accra-based. We know the roads that break suspensions and the ones that don\'t. The vehicles we ship are picked for Ghana conditions — ground clearance, AC capacity, parts availability.',
    icon: Award,
  },
];

export default function TrustSection() {
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
            Why Buyers Trust IzzyAutoBridge
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4 text-balance"
          >
            Six questions every Ghana importer should ask — we answer them upfront
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto"
          >
            We don't disappear at port. Every vehicle is inspected, documented, and backed by our Accra team.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, i) => (
            <motion.article
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="group card card-hover p-6 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative flex items-start gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0 w-14 h-14 bg-[var(--color-accent-glow)] text-[var(--color-accent)] rounded-2xl flex items-center justify-center"
                >
                  <item.icon size={26} strokeWidth={2} />
                </motion.div>
                <div className="flex-1">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-extrabold text-[var(--color-accent)] font-mono"
                  >
                    {item.num}
                  </motion.span>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="font-display font-bold text-lg mt-1 text-white group-hover:text-[var(--color-accent)] transition-colors"
                  >
                    {item.question}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed"
                  >
                    {item.answer}
                  </motion.p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Background>
    </section>
  );
}