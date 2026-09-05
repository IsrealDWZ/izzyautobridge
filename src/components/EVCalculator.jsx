import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Fuel, DollarSign, Calculator } from 'lucide-react';

const USD_GHS_RATE = 15.5;

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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/15 text-navy dark:text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator size={16} /> EV Savings Calculator
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Electric vs. Petrol — Daily Cost Comparison
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            See exactly how much you save on fuel vs. petrol in Ghana today. Adjust the sliders to match your driving habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <SliderInput
            label="Daily Distance (km)"
            value={dailyKm}
            onChange={setDailyKm}
            min={10} max={200} step={5}
            icon={DollarSign}
          />
          <SliderInput
            label="Petrol Price (GHS/L)"
            value={petrolPrice}
            onChange={setPetrolPrice}
            min={10} max={20} step={0.25}
            icon={Fuel}
          />
          <SliderInput
            label="Petrol Consumption (L/100km)"
            value={petrolConsumption}
            onChange={setPetrolConsumption}
            min={4} max={15} step={0.5}
            icon={Fuel}
          />
          <SliderInput
            label="Electricity Rate (GHS/kWh)"
            value={electricityRate}
            onChange={setElectricityRate}
            min={0.5} max={3} step={0.1}
            icon={Zap}
          />
          <SliderInput
            label="EV Consumption (kWh/100km)"
            value={evConsumption}
            onChange={setEvConsumption}
            min={10} max={25} step={0.5}
            icon={Zap}
          />
        </div>

        {/* Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-success to-emerald-600 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl md:text-6xl font-bold">GH₵{monthlySave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
              <div className="text-sm opacity-90 mt-1">Monthly Fuel Savings</div>
            </div>
            <div className="border-l border-white/20 py-4 md:py-0">
              <div className="text-3xl md:text-4xl font-bold">GH₵{dailySave.toFixed(2)}</div>
              <div className="text-sm opacity-90 mt-1">Daily Savings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">GH₵{yearlySave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
              <div className="text-sm opacity-90 mt-1">Yearly Savings</div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">Petrol: GH₵{petrolDaily.toFixed(2)}/day</div>
              <div className="text-xs opacity-75">@ {petrolPrice} GHS/L, {petrolConsumption}L/100km</div>
            </div>
            <div className="border-l border-white/20 py-4 md:py-0 md:border-l md:border-t-0">
              <div className="text-lg font-bold">EV: GH₵{evDaily.toFixed(2)}/day</div>
              <div className="text-xs opacity-75">@ {electricityRate} GHS/kWh, {evConsumption}kWh/100km</div>
            </div>
            <div>
              <div className="text-lg font-bold">Save {savePercent}%</div>
              <div className="text-xs opacity-75">on fuel costs</div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-navy-deep rounded-2xl">
          <h3 className="font-display text-lg font-semibold mb-3">💡 Real-world example</h3>
          <p className="text-gray-600 dark:text-gray-400">
            A BYD Atto 3 (16 kWh/100km) vs. a 2.0L petrol SUV (8.5L/100km) driven 50km/day in Accra:
            <strong className="text-navy dark:text-gold"> ~GH₵38,000/year saved</strong>. That's a new phone every year, or school fees covered.
          </p>
        </div>
      </div>
    </section>
  );
}

function SliderInput({ label, value, onChange, min, max, step, icon: Icon }) {
  return (
    <div className="bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-xl p-5">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        <Icon className="text-gold" size={16} />
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
          className="flex-1 h-2 bg-gray-200 dark:bg-navy rounded-lg appearance-none accent-gold"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-20 px-2 py-1 text-center bg-gray-100 dark:bg-navy border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium"
        />
      </div>
    </div>
  );
}