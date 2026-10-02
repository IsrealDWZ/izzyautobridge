import { motion, useScroll, useSpring } from "framer-motion";

// Thin page-scroll progress bar fixed to the top. Mount once (e.g. in App.jsx or Hero.jsx).
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-navy"
    />
  );
}
