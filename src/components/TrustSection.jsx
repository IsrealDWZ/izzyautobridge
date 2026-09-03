import { motion } from 'framer-motion';
import { CheckCircle, Shield, Truck, Wrench, MapPin, Award } from 'lucide-react';

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
    answer: 'Path 02: Fly to China, pick the car yourself. We arrange visa support, airport pickup, drive you to our Foshan yard. Test drive, engine inspection with our mechanic. You decide.',
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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold/15 text-navy dark:text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Why Buyers Trust IzzyAutoBridge
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Six questions every Ghana importer should ask — we answer them upfront
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We don't disappear at port. Every vehicle is inspected, documented, and backed by our Accra team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, i) => (
            <motion.article
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-surface p-6 hover:border-gold/50 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/15 text-navy dark:text-gold rounded-xl flex items-center justify-center">
                  <item.icon size={24} />
                </div>
                <div className="flex-1">
                  <span className="text-2xl font-bold text-gold/50">{item.num}</span>
                  <h3 className="font-display font-bold text-lg mt-1">{item.question}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}