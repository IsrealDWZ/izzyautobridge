import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Car, Mail, Lock, Truck } from 'lucide-react';
import { useState } from 'react';

import { WHATSAPP_NUMBER } from '../utils/constants';
import { sanitizeFormInput, sanitizeWhatsAppMessage, validateWhatsAppNumber } from '../utils/validation';
import { Background } from './Background';

const fieldIcons = {
  brand: Car,
  model: Car,
  year: Truck,
  fuel: Mail,
  body: Truck,
  budget: Lock,
  notes: Sparkles,
};

export default function ConciergeForm({ _vehicles, _whatsappNumber = WHATSAPP_NUMBER }) {
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
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const sanitized = sanitizeFormInput(value, { maxLength: field === 'notes' ? 2000 : 200 });
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year || formData.year < 1990 || formData.year > new Date().getFullYear() + 2) {
      newErrors.year = 'Valid year required';
    }
    if (!formData.budget || formData.budget < 50000 || formData.budget > 2000000) {
      newErrors.budget = 'Budget must be between GH₵50,000 and GH₵2,000,000';
    }
    if (!validateWhatsAppNumber(WHATSAPP_NUMBER)) {
      newErrors.whatsapp = 'Invalid WhatsApp configuration';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    const msg = sanitizeWhatsAppMessage(
      `Vehicle Request: ${formData.brand} ${formData.model} ${formData.year} | Fuel: ${formData.fuel} | Body: ${formData.body} | Budget: GH₵${formData.budget.toLocaleString()} | Notes: ${formData.notes}`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[var(--color-overlay)] z-50 flex items-center justify-center p-4"
        onClick={() => setSubmitted(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-[var(--color-container)] border border-[var(--color-border)] rounded-3xl max-w-md w-full p-6 sm:p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 15 }}
            className="w-20 h-20 bg-[var(--color-accent-glow)] text-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle size={36} strokeWidth={2} />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-2xl font-bold text-white mb-2"
          >
            Request Sent!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-[var(--color-text-muted)] mb-6"
          >
            We'll reach out on WhatsApp within 2 hours with matching vehicles.
          </motion.p>
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="block bg-[var(--color-whatsapp)] text-white font-semibold py-3 rounded-xl hover:brightness-110 transition-all min-h-[48px] flex items-center justify-center gap-2"
            style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)' }}
          >
            <MessageSquare size={18} strokeWidth={2.5} />
            Continue on WhatsApp
          </motion.a>
          <motion.button
            onClick={() => { 
              setFormData({ brand: '', model: '', year: 2024, fuel: 'Any', body: 'Any', budget: 300000, notes: '' }); 
              setErrors({});
              setSubmitted(false); 
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Make another request
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <section className="container-custom section-padding">
      <Background variant="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge badge-accent px-4 py-2 text-sm"
          >
            <Sparkles size={16} className="mr-1" strokeWidth={2} />
            Can't Find What You Need?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4 text-balance"
          >
            Request a specific vehicle — we'll source it from our China network
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto"
          >
            Tell us exactly what you're looking for. We'll search our network and send matches within 24 hours.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {[
                { field: 'brand', label: 'Brand', placeholder: 'e.g., BYD, Toyota, Mercedes', icon: Car },
                { field: 'model', label: 'Model', placeholder: 'e.g., Atto 3, Camry, G-Wagon', icon: Car },
                { field: 'year', label: 'Year', placeholder: 'Year', icon: Truck },
                { field: 'body', label: 'Body Type', placeholder: 'Body Type', icon: Truck },
              ].map(({ field, label, placeholder, icon: Icon }) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="relative"
                >
                  <label className="label flex items-center gap-2">
                    <Icon size={14} className="text-[var(--color-accent)]" strokeWidth={2} />
                    {label}
                  </label>
                  {field === 'year' ? (
                    <select
                      value={formData[field]}
                      onChange={(e) => handleChange(field, parseInt(e.target.value) || 2024)}
                      className="input"
                      aria-invalid={errors[field] ? 'true' : 'false'}
                      aria-describedby={errors[field] ? `${field}-error` : undefined}
                    >
                      {Array.from({ length: 11 }, (_, i) => 2026 - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className={`input ${errors[field] ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]' : ''}`}
                      aria-invalid={errors[field] ? 'true' : 'false'}
                      aria-describedby={errors[field] ? `${field}-error` : undefined}
                    />
                  )}
                  {errors[field] && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id={`${field}-error`}
                      className="mt-1.5 text-sm text-[var(--color-danger)] flex items-center gap-1"
                    >
                      <span className="text-[var(--color-danger)]">⚠</span>
                      {errors[field]}
                    </motion.p>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <label className="label flex items-center gap-2">
                  <Mail size={14} className="text-[var(--color-accent)]" strokeWidth={2} />
                  Fuel Type
                </label>
                <select
                  value={formData.fuel}
                  onChange={(e) => handleChange('fuel', e.target.value)}
                  className="input"
                >
                  <option value="Any">Any</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="EV">Electric</option>
                  <option value="PHEV">PHEV</option>
                </select>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              <label className="label flex items-center gap-2">
                <Lock size={14} className="text-[var(--color-accent)]" strokeWidth={2} />
                Budget (GHS)
              </label>
              <input
                type="number"
                min={50000}
                max={2000000}
                step={50000}
                value={formData.budget}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  handleChange('budget', isNaN(value) ? 0 : value);
                }}
                className={`input ${errors.budget ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]' : ''}`}
                aria-invalid={errors.budget ? 'true' : 'false'}
                aria-describedby={errors.budget ? 'budget-error' : undefined}
              />
              {errors.budget && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="budget-error"
                  className="mt-1.5 text-sm text-[var(--color-danger)] flex items-center gap-1"
                >
                  <span className="text-[var(--color-danger)]">⚠</span>
                  {errors.budget}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <label className="label flex items-center gap-2">
                <Sparkles size={14} className="text-[var(--color-accent)]" strokeWidth={2} />
                Additional Requirements
              </label>
              <textarea
                rows={4}
                placeholder="Color, specs, features, timeline, etc."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="input resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn btn-primary group relative overflow-hidden"
              style={{ boxShadow: 'var(--shadow-glow)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles size={18} strokeWidth={2} />
                Find My Vehicle
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.button>
          </form>
        </motion.div>
      </Background>
    </section>
  );
}