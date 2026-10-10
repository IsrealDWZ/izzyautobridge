import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalArticle({ title, updated, intro, children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl mx-auto"
    >
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted mb-5">
        <Link to="/" className="hover:text-main transition-colors">Home</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-main font-medium">{title}</span>
      </nav>

      <header className="mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
        <p className="text-sm text-muted mt-2">Last updated {updated}</p>
        {intro && <p className="text-muted mt-3 max-w-2xl">{intro}</p>}
      </header>

      <div className="card-surface rounded-2xl p-6 sm:p-8">{children}</div>

      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-main transition-colors"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Back to home
        </Link>
      </div>
    </motion.article>
  );
}

export function LegalSection({ title, id, children }) {
  return (
    <section id={id} className="mb-7 last:mb-0 scroll-mt-32">
      <h2 className="font-display text-lg sm:text-xl font-bold mb-2.5">{title}</h2>
      <div className="text-sm leading-relaxed text-main space-y-3">{children}</div>
    </section>
  );
}
