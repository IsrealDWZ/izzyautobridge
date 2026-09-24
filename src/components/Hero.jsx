import { motion } from 'framer-motion';

import { Background, GradientOrb } from './Background';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export default function Hero({ title, subtitle }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <Background variant="hero">
        <GradientOrb size={500} color="accent" className="-top-40 -right-40" opacity={15} />
        <GradientOrb size={300} color="info" className="bottom-40 -left-20" opacity={10} />
        <GradientOrb size={200} color="success" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" opacity={8} />
      </Background>

      <motion.div
        className="relative z-10 px-6 md:px-12 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={badgeVariants} className="flex flex-wrap gap-2 mb-8" style={{ transitionDelay: '100ms' }}>
          <span className="badge badge-accent px-4 py-1.5">
            <span className="flex items-center gap-1.5">
              <motion.span
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                🇨🇳
              </motion.span>
              Direct from China
            </span>
          </span>
          <span className="badge badge-neutral px-4 py-1.5">
            <span className="flex items-center gap-1.5">
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                📦
              </motion.span>
              CIF Tema Shipping Included
            </span>
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.02] tracking-tight text-balance"
          style={{ transitionDelay: '200ms' }}
        >
          {title}
          <br />
          <span className="text-gradient-accent font-extrabold">Bridged to Ghana</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-8 text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed font-light"
          style={{ transitionDelay: '300ms' }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row gap-4"
          style={{ transitionDelay: '400ms' }}
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary group relative overflow-hidden"
            style={{ boxShadow: 'var(--shadow-glow)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Browse Inventory
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-secondary group"
          >
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                ⚡
              </motion.span>
              EV Savings Calculator
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center gap-8 text-sm text-[var(--color-text-dim)]"
          style={{ transitionDelay: '500ms' }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-[var(--color-success)]"
            />
            <span>169+ Vehicles Ready</span>
          </div>
          <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-6">
            <span className="font-mono text-[var(--color-accent)]">60</span>
            <span>Days Delivery</span>
          </div>
          <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-6">
            <span className="font-mono text-[var(--color-accent)]">12</span>
            <span>Month Warranty</span>
          </div>
          <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-6">
            <span className="font-mono text-[var(--color-accent)]">SGS</span>
            <span>Inspected</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-8 h-14 rounded-full border-2 border-[var(--color-border)] flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}