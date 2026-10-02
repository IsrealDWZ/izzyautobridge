import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Cascading triple chevrons. Replaces the mouse-wheel dot.
// Usage (inside the hero, bottom-centre): <ScrollChevrons targetId="next" />
export default function ScrollChevrons({ targetId }) {
  const go = () =>
    targetId &&
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={go}
      aria-label="Scroll down"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center -space-y-3"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/70" />
        </motion.span>
      ))}
    </button>
  );
}
