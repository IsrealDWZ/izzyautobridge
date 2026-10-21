import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function LandingHero() {
  return (
    <section className="relative h-[640px] sm:h-[720px] w-full overflow-hidden bg-slate-950">
      {/* Decorative background gradient */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center opacity-35"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-slate-950/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Left: Content */}
        <div className="md:w-1/2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/20 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider mb-6 block">
            New Arrival
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight">
            2027 BYD Atto 3
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-md leading-relaxed">
            Electric exhilaration. Built for Ghanaian roads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/inventory"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-9 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 min-h-[56px] justify-center shadow-lg hover:shadow-emerald-600/30"
            >
              Explore Details <ArrowRight size={20} />
            </a>
            <a
              href="https://wa.me/233536225804"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-emerald-400 hover:text-emerald-400 text-white px-9 py-5 rounded-xl font-bold text-lg transition-all duration-300 min-h-[56px] justify-center"
            >
              WhatsApp Inquiry
            </a>
          </div>
        </div>

        {/* Right: Secondary CTA card */}
        <div className="hidden lg:block w-96">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Estimate Your Import Cost</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Vehicle Price (USD)</span>
                <span className="font-bold text-slate-900">$14,700</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Est. Duty &amp; Shipping</span>
                <span className="font-bold text-slate-900">+$4,200</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-slate-200">
                <span className="text-emerald-600 font-bold text-lg">GH₵176,400</span>
                <span className="text-xs text-slate-400">Landed at Tema</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-emerald-500 transition-all duration-300 focus:outline-none"
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
