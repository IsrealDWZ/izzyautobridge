import { Factory, ShieldCheck, Truck } from 'lucide-react';

const DISCOVER_CARDS = [
  {
    title: 'Sourcing & Inspection',
    description:
      'Real-time factory verification in China hubs. Every vehicle is physically inspected before loading.',
    image:
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80&auto=format&fit=crop',
    icon: Factory,
  },
  {
    title: 'Escrow & Payment Safety',
    description:
      'Secure transactions tailored for Ghanaian buyers. Your funds are protected until delivery is confirmed.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f7a06d?w=1200&q=80&auto=format&fit=crop',
    icon: ShieldCheck,
  },
  {
    title: 'Logistics & Clearance',
    description:
      'Container shipping directly to Tema / Takoradi ports with full customs clearance support.',
    image:
      'https://images.unsplash.com/photo-1546772897-ac9c06195802?w=1200&q=80&auto=format&fit=crop',
    icon: Truck,
  },
];

export default function LandingDiscover() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">
              Discover IzzyAutoBridge
            </h2>
            <p className="text-slate-600 text-sm">
              Why thousands of Ghanaian buyers trust us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DISCOVER_CARDS.map((card, i) => (
            <div key={i} className="relative h-[420px] rounded-3xl overflow-hidden group">
              <img
                src={card.image}
                alt=""
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 z-10">
                <div className="flex items-center gap-2 mb-4">
                  <card.icon size={16} className="text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    {card.title.split(' ')[0]}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  {card.description}
                </p>
                <a
                  href="/inventory"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white underline underline-offset-4 hover:text-emerald-300 transition-colors"
                >
                  Learn More <span className="text-emerald-400">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
