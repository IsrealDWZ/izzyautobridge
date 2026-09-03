import { motion } from 'framer-motion';

export default function ComparisonSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-gold/15 text-navy dark:text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Transparent Pricing
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Local Dealer vs. IzzyAutoBridge Direct
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Why direct import saves you 15-25% on every vehicle
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-navy via-navy/80 to-navy/60 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-gold rounded-full blur-3xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Local Dealer */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs uppercase tracking-widest bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full">
                  🏪 Local Dealer
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">GH₵550,000</div>
              <div className="text-white/70 mb-6 space-y-2 text-sm">
                <p>• Dealer markup 25-35%</p>
                <p>• Hidden fees & commissions</p>
                <p>• Limited model selection</p>
                <p>• No cost transparency</p>
              </div>
            </div>

            {/* IzzyAutoBridge */}
            <div className="p-6 bg-gold/15 border border-gold/30 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs uppercase tracking-widest bg-gold text-navy px-3 py-1.5 rounded-full font-semibold">
                  🚢 IzzyAutoBridge Direct
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-navy mb-2">GH₵440,000</div>
              <div className="text-navy/80 mb-6 space-y-2 text-sm">
                <p>• Wholesale + fixed fee only</p>
                <p>• Full landed cost breakdown</p>
                <p>• 70+ models from China</p>
                <p>• Video proof & SGS inspection</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-block bg-gold text-navy px-8 py-3 rounded-full font-bold text-lg"
            >
              💰 Save ~GH₵110,000+ per vehicle
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}