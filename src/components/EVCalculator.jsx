import { motion } from 'framer-motion';
import { Zap, Fuel, DollarSign, Calculator, TrendingUp, Battery } from 'lucide-react';
import { useState } from 'react';

import { Background } from './Background';

function SliderInput({ label, value, onChange, min, max, step, icon: Icon, color = 'accent', unit = '' }) {
  const colorClasses = {
    accent: 'text-[var(--color-accent)] bg-[var(--color-accent-glow)]',
    info: 'text-[var(--color-info)] bg-[rgba(45,156,219,0.15)]',
    success: 'text-[var(--color-success)] bg-[rgba(0,200,150,0.15)]',
    warning: 'text-[var(--color-warning)] bg-[rgba(245,166,35,0.15)]',
    danger: 'text-[var(--color-danger)] bg-[rgba(224,75,75,0.15)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5"
    >
      <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] mb-3">
        <Icon size={16} className={colorClasses[color]} strokeWidth={2} />
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-[var(--color-border)] rounded-lg appearance-none accent-[var(--color-accent)]"
          aria-label={label}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-24 px-3 py-2 text-center bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-xl text-sm font-semibold text-[var(--color-text)]"
        />
        {unit && <span className="text-sm text-[var(--color-text-dim)] font-mono">{unit}</span>}
      </div>
    </motion.div>
  );
}

export default function EVCalculator() {
  const [dailyKm, setDailyKm] = useState(50);
  const [petrolPrice, setPetrolPrice] = useState(14.50);
  const [petrolConsumption, setPetrolConsumption] = useState(8.5);
  const [electricityRate, setElectricityRate] = useState(1.20);
  const [evConsumption, setEvConsumption] = useState(16.0);

  const petrolDaily = (dailyKm / 100) * petrolConsumption * petrolPrice;
  const evDaily = (dailyKm / 100) * evConsumption * electricityRate;
  const dailySave = petrolDaily - evDaily;
  const monthlySave = dailySave * 30;
  const yearlySave = dailySave * 365;
  const savePercent = petrolDaily > 0 ? ((dailySave / petrolDaily) * 100).toFixed(0) : 0;

  return (
    <section className="container-custom section-padding relative">
      <Background variant="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge badge-accent px-4 py-2 text-sm flex items-center justify-center gap-2 mx-auto"
            >
              <Calculator size={16} strokeWidth={2} className="text-[var(--color-accent)]" />
              EV Savings Calculator
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4 text-balance"
            >
              Electric vs. Petrol — Daily Cost Comparison
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto"
            >
              See exactly how much you save on fuel vs. petrol in Ghana today. Adjust the sliders to match your driving habits.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SliderInput
              label="Daily Distance (km)"
              value={dailyKm}
              onChange={setDailyKm}
              min={10} max={200} step={5}
              icon={TrendingUp}
              color="accent"
              unit="km"
            />
            <SliderInput
              label="Petrol Price (GHS/L)"
              value={petrolPrice}
              onChange={setPetrolPrice}
              min={10} max={20} step={0.25}
              icon={Fuel}
              color="warning"
              unit="GHS"
            />
            <SliderInput
              label="Petrol Consumption (L/100km)"
              value={petrolConsumption}
              onChange={setPetrolConsumption}
              min={4} max={15} step={0.5}
              icon={Fuel}
              color="warning"
              unit="L"
            />
            <SliderInput
              label="Electricity Rate (GHS/kWh)"
              value={electricityRate}
              onChange={setElectricityRate}
              min={0.5} max={3} step={0.1}
              icon={Zap}
              color="info"
              unit="GHS"
            />
            <SliderInput
              label="EV Consumption (kWh/100km)"
              value={evConsumption}
              onChange={setEvConsumption}
              min={10} max={25} step={0.5}
              icon={Battery}
              color="success"
              unit="kWh"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[var(--color-success)]/20 via-[var(--color-accent)]/10 to-transparent border border-[var(--color-success-dim)]/30 rounded-3xl p-8"
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-5xl sm:text-7xl font-extrabold text-[var(--color-success)] tabular-nums"
                >
                  GH₵{monthlySave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </motion.div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">Monthly Fuel Savings</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, type: 'spring', stiffness: 300, damping: 15 }}
                className="border-l border-[var(--color-border)] py-4 md:py-0 md:border-l md:border-t-0"
              >
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
                  className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums"
                >
                  GH₵{dailySave.toFixed(2)}
                </motion.div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">Daily Savings</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 15 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: 'easeInOut' }}
                  className="text-4xl sm:text-5xl font-extrabold text-[var(--color-accent)] tabular-nums"
                >
                  GH₵{yearlySave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </motion.div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">Yearly Savings</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 pt-8 border-t border-[var(--color-border)] grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <div className="text-lg font-bold text-white">Petrol: GH₵{petrolDaily.toFixed(2)}/day</div>
                <div className="text-xs text-[var(--color-text-dim)] mt-1">@ {petrolPrice} GHS/L, {petrolConsumption}L/100km</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="border-l border-[var(--color-border)] py-4 md:py-0 md:border-l md:border-t-0"
              >
                <div className="text-lg font-bold text-white">EV: GH₵{evDaily.toFixed(2)}/day</div>
                <div className="text-xs text-[var(--color-text-dim)] mt-1">@ {electricityRate} GHS/kWh, {evConsumption}kWh/100km</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75, type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="text-lg font-bold text-[var(--color-accent)] flex items-center justify-center gap-1">
                  <TrendingUp size={18} />
                  Save {savePercent}% on fuel
                </div>
                <div className="text-xs text-[var(--color-text-dim)] mt-1">on fuel costs</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 card p-6"
          >
            <motion.div
              className="flex items-center gap-3 text-[var(--color-accent)] mb-3"
            >
              <Battery size={24} />
              <h3 className="font-display text-lg font-semibold text-white">Real-world example</h3>
            </motion.div>
            <p className="text-[var(--color-text-muted)]">
              A BYD Atto 3 ({evConsumption} kWh/100km) vs. a 2.0L petrol SUV ({petrolConsumption}L/100km) driven {dailyKm}km/day in Accra:
              <strong className="text-[var(--color-accent)]"> ~GH₵{yearlySave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/year saved</strong>. That's a new phone every year, or school fees covered.
            </p>
          </motion.div>
        </motion.div>
      </Background>
    </section>
  );
}