import { Phone, MapPin, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  'Shopping Tools': [
    { label: 'Request a Custom Quote', href: '#' },
    { label: 'Calculate Port Duties', href: '#' },
    { label: 'Search China Live Inventory', href: '#' },
    { label: 'Track My Shipment Container', href: '#' },
  ],
  'Vehicle Categories': [
    { label: 'SUVs & Crossovers', href: '#' },
    { label: 'Sedans & EVs', href: '#' },
    { label: 'Trucks & Commercial', href: '#' },
    { label: 'Upcoming Imports', href: '#' },
  ],
};

export default function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white tracking-wider">IA</span>
              </div>
              <span className="font-bold text-white text-xl">IzzyAutoBridge</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-[320px]">
              Direct China vehicle supply to Ghana. Transparent landed costs,
              port-to-door delivery, and a route you can actually track from
              factory to driveway.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Accra Office</p>
                <p className="text-xs text-slate-500">+233 53 622 5804</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Visit Us</p>
                <p className="text-xs text-slate-500">Tema Port, Ghana</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Email Us</p>
                <p className="text-xs text-slate-500">info@izzyautobridge.com</p>
              </div>
            </div>
          </div>
          <div className="mt-14 pt-8 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} IzzyAutoBridge Ghana. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
