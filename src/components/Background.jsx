import { motion } from 'framer-motion';

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E`;
const noiseSvgHero = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E`;
const noiseSvgSection = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E`;

export function Background({ className = '', children, variant = 'default' }) {
  const variants = {
    default: (
      <>
        <div className="absolute inset-0 bg-bg" />
        <div className={`absolute inset-0 bg-[url("${noiseSvg}")] opacity-50 pointer-events-none`} />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />
      </>
    ),
    hero: (
      <>
        <div className="absolute inset-0 bg-bg" />
        <motion.div
          className={`absolute inset-0 bg-[url("${noiseSvgHero}")] pointer-events-none`}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,67,0.12)_0%,transparent_50%),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(45,156,219,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-bg via-transparent to-transparent pointer-events-none" />
      </>
    ),
    section: (
      <>
        <div className="absolute inset-0 bg-bg" />
        <div className={`absolute inset-0 bg-[url("${noiseSvgSection}")] opacity-40 pointer-events-none`} />
      </>
    ),
    card: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg" />
        <div className={`absolute inset-0 bg-[url("${noiseSvg}")] opacity-20 pointer-events-none`} />
      </>
    ),
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {variants[variant]}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function GradientOrb({ className = '', size = 400, color = 'accent', blur = '3xl', opacity = 20 }) {
  const colors = {
    accent: 'rgba(212, 168, 67, ',
    info: 'rgba(45, 156, 219, ',
    success: 'rgba(0, 200, 150, ',
  };

  return (
    <motion.div
      className={`absolute rounded-full filter blur-${blur} opacity-${opacity} pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
        scale: [1, 1.05, 0.95, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, ${colors[color]}0.${opacity}) 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

export function ShimmerBorder({ children, className = '', duration = 3 }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 -inset-[1px] rounded-[inherit] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div
          className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{ backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'] }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>
      <div className="relative bg-bg-elevated rounded-[inherit] z-10">{children}</div>
    </div>
  );
}

export function NoiseOverlay({ className = '', opacity = 4 }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("${noiseSvg}")`,
      }}
    />
  );
}