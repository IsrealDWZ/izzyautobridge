import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ShowcaseVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.muted = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      video.pause();
      setPlaying(false);
      return undefined;
    }
    const attempt = video.play();
    if (attempt) {
      attempt.then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    return undefined;
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="showcase" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gold/15 text-navy dark:text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            See it in motion
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Your car, bridged — in four seconds
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Inspected in China, shipped, cleared at Tema, delivered to your door.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-[#243456] bg-black"
        >
          <video
            ref={videoRef}
            className="block w-full h-auto aspect-video"
            src="/media/izzy-promo.mp4"
            poster="/media/izzy-promo-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="IzzyAutoBridge promo: source, ship, clear — order via WhatsApp"
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pause video' : 'Play video'}
            className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {playing ? <Pause size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
