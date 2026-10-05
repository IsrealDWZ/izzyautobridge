import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ShowcaseVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.muted = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      video.pause();
      return undefined;
    }
    const attempt = video.play();
    if (attempt) attempt.catch(() => {});
    return undefined;
  }, []);

  const blockMenu = (event) => event.preventDefault();

  return (
    <section id="showcase" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden border border-subtle bg-black"
          onContextMenu={blockMenu}
        >
          <video
            ref={videoRef}
            className="block w-full h-auto aspect-video pointer-events-none select-none"
            src="/media/izzy-promo.mp4"
            poster="/media/izzy-promo-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            onContextMenu={blockMenu}
            draggable={false}
            aria-label="IzzyAutoBridge promo: source, ship, clear — order via WhatsApp"
          />
        </motion.div>
      </div>
    </section>
  );
}
