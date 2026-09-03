import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1605745341112-85968b19335b?fm=jpg&q=80&w=1920&auto=format&fit=crop"
          alt="Cargo ship carrying containers at sea"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/35" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 px-6 md:px-12 max-w-3xl"
      >
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs uppercase tracking-widest bg-gold text-navy font-bold px-3 py-1.5 rounded-full">
            🇨🇳 Direct from China
          </span>
          <span className="text-xs uppercase tracking-widest bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full">
            📦 CIF Tema Shipping Included
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
          Your car,
          <br />
          bridged to Ghana.
        </h1>

        <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
          70+ inspected vehicles from China. Transparent landed costs,
          12-month warranty, and a route you can actually track — from
          port to your driveway.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="bg-gold text-navy font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:brightness-95 transition">
            Browse Inventory
          </button>
          <button className="border border-white/30 text-white font-medium px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white/10 transition">
            EV Savings Calculator
          </button>
        </div>
      </motion.div>

      {/* scroll cue, matches ecodrive's bounce indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}
