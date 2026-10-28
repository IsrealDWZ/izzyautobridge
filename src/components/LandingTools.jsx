import { Search, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

const TOOLS = [
  {
    icon: Search,
    label: 'Request a Custom Quote',
    description:
      'Get a personalized landed-cost estimate for your desired vehicle, including duty and shipping to Tema.',
    color: 'bg-blue-50 text-blue-900 border-blue-200 icon-bg-blue-500',
  },
  {
    icon: ShieldCheck,
    label: 'Calculate Port Duties',
    description:
      'Estimate Ghana import duties, VAT, and clearance charges for any vehicle.',
    color: 'bg-emerald-50 text-emerald-900 border-emerald-200 icon-bg-emerald-500',
  },
  {
    icon: Truck,
    label: 'Search China Live Inventory',
    description:
      'Browse real-time availability from our China supply partners before they arrive.',
    color: 'bg-indigo-50 text-indigo-900 border-indigo-200 icon-bg-indigo-500',
  },
  {
    icon: ArrowRight,
    label: 'Track My Shipment Container',
    description: 'Monitor your vehicle from factory departure to Tema port arrival.',
    color: 'bg-orange-50 text-orange-900 border-orange-200 icon-bg-orange-500',
  },
];

export default function LandingTools() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {TOOLS.map((tool, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center"
            >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-7 ${tool.color} group-hover:scale-110 transition-transform duration-500`}>
              <tool.icon size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
              {tool.label}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">
              {tool.description}
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Get Started <ArrowRight size={16} className="text-emerald-500" />
            </button>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
