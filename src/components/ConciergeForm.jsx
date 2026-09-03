import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Plane, Car, Wrench, Hotel, CheckCircle, Video } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const WHATSAPP_NUMBER = '233XXXXXXXXX';

export default function ConciergeForm({ vehicles, whatsappNumber = WHATSAPP_NUMBER }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: 2024,
    fuel: 'Any',
    body: 'Any',
    budget: 300000,
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const path02Link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Interested in Path 02: Fly to China and pick vehicles myself. Please send details.`
  )}`;

  if (submitted) {
    const msg = `Vehicle Request: ${formData.brand} ${formData.model} ${formData.year} | Fuel: ${formData.fuel} | Body: ${formData.body} | Budget: GH₵${formData.budget.toLocaleString()} | Notes: ${formData.notes}`;
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4"
        onClick={() => setSubmitted(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-navy rounded-2xl max-w-md w-full p-8 text-center"
        >
          <div className="w-16 h-16 bg-gold/15 text-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h3 className="font-display text-2xl font-bold mb-2">Request Sent!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We'll reach out on WhatsApp within 2 hours with matching vehicles.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`}
            target="_blank"
            rel="noreferrer"
            className="block bg-whatsapp text-white font-semibold py-3 rounded-lg hover:brightness-95 transition"
          >
            💬 Continue on WhatsApp
          </a>
          <button
            onClick={() => { setFormData({ brand: '', model: '', year: 2024, fuel: 'Any', body: 'Any', budget: 300000, notes: '' }); setSubmitted(false); }}
            className="mt-4 text-sm text-gray-500 hover:text-navy"
          >
            Make another request
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-gold/15 text-navy dark:text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} /> Can't Find What You Need?
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Request a specific vehicle — we'll source it from our China network
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Tell us exactly what you're looking for. We'll search our network and send matches within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Request Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="card-surface p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g., BYD, Toyota, Mercedes"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Model</label>
                  <input
                    type="text"
                    placeholder="e.g., Atto 3, Camry, G-Wagon"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    {Array.from({ length: 11 }, (_, i) => 2026 - i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuel Type</label>
                  <select
                    value={formData.fuel}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="Any">Any</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="EV">Electric</option>
                    <option value="PHEV">PHEV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Body Type</label>
                  <select
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="Any">Any</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Van/Minibus">Van/Minibus</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget (GHS)</label>
                  <input
                    type="number"
                    min={50000}
                    max={2000000}
                    step={50000}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Color, specs, features, timeline, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-navy text-white py-3 rounded-lg font-semibold hover:bg-navy/90 transition"
              >
                🔍 Find My Vehicle
              </button>
            </form>
          </motion.div>

          {/* Path 02: Fly & Pick */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-navy text-white rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={28} className="text-gold" />
              <h3 className="font-display text-2xl font-bold">Path 02: Fly & Pick</h3>
            </div>
            <p className="text-white/80 mb-6">
              Want to inspect yourself? We arrange everything — you just show up and decide.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { icon: Plane, text: 'China visa support letter' },
                { icon: Car, text: 'Airport pickup in Guangzhou' },
                { icon: Hotel, text: 'Hotel booking near Foshan yard' },
                { icon: Wrench, text: 'Test drive with our mechanic' },
                { icon: Video, text: 'Engine inspection on-site' },
                { icon: CheckCircle, text: 'You approve before container loads' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <item.icon size={18} className="text-gold flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
            <p className="text-white/60 text-sm mb-6">
              <strong>Best for:</strong> Fleet buyers (5+ units), high-value purchases, first-time importers wanting maximum confidence.
            </p>
            <a
              href={path02Link}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-gold text-navy px-6 py-3 rounded-full font-bold hover:bg-gold/90 transition"
            >
              💬 Request Path 02 Details
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}