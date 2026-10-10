import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import ScrollChevrons from './ScrollChevrons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero({ title, subtitle }) {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605745341112-85968b19335b?fm=webp&q=70&w=1280&auto=format&fit=crop"
          alt="Cargo ship carrying containers at sea"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 px-6 md:px-12 max-w-3xl"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
          {title}
        </h1>

        <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/inventory"
            className="bg-action text-onaction font-bold text-xl px-8 py-4 rounded-full tracking-wide hover:opacity-85 transition"
          >
            Browse Inventory
          </Link>
          <button
            onClick={() =>
              document
                .getElementById('calculator')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="border border-white/50 text-white font-semibold px-8 py-4 rounded-full tracking-wide hover:bg-white/10 transition"
          >
            EV Savings Calculator
          </button>
        </div>
      </motion.div>

      <ScrollChevrons targetId="next" />
    </section>
  );
}