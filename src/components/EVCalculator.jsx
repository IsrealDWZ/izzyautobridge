import { motion, useSpring, useTransform } from 'framer-motion';
import {
  BatteryCharging,
  Calculator,
  Fuel,
  Gauge,
  Lightbulb,
  Route,
  SlidersHorizontal,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EVCalculator() {
  const [dailyKm, setDailyKm] = useState(50);
  const [petrolPrice, setPetrolPrice] = useState(14.5);
  const [petrolConsumption, setPetrolConsumption] = useState(8.5);
  const [electricityRate, setElectricityRate] = useState(1.2);
  const [evConsumption, setEvConsumption] = useState(16);

  const petrolDaily = (dailyKm / 100) * petrolConsumption * petrolPrice;
  const evDaily = (dailyKm / 100) * evConsumption * electricityRate;
  const dailySave = petrolDaily - evDaily;
  const monthlySave = dailySave * 30;
  const yearlySave = dailySave * 365;
  const savePercent = petrolDaily > 0 ? ((dailySave / petrolDaily) * 100).toFixed(0) : 0;
  const maxDaily = Math.max(petrolDaily, evDaily, 0.01);

  const monthlySpring = useSpring(0, { stiffness: 60, damping: 18 });
  useEffect(() => {
    monthlySpring.set(monthlySave);
  }, [monthlySave, monthlySpring]);
  const monthlyDisplay = useTransform(monthlySpring, (v) =>
    Math.round(v).toLocaleString()
  );

  return (
    <section id="calculator" className="py-16 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/15 text-navy dark:text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator size={16} /> EV Savings Calculator
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Electric vs. Petrol — Daily Cost Comparison
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            See exactly how much you save on fuel vs. petrol in Ghana today.
            Adjust the sliders to match your driving habits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Inputs panel */}
          <div className="lg:col-span-3 bg-white dark:bg-navy-deep border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-gold" />
                Your driving
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Adjust to match your commute
              </span>
            </div>

            <div className="space-y-5">
              <SliderInput
                label="Daily Distance (km)"
                value={dailyKm}
                onChange={setDailyKm}
                min={10} max={200} step={5}
                icon={Route}
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
                icon={Gauge}
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
                icon={BatteryCharging}
              />
            </div>
          </div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-navy text-white p-6 sm:p-8 lg:sticky lg:top-32"
          >
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gold/15 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                  <Zap size={14} /> Projected savings
                </span>
                <span className="bg-gold text-navy px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                  {savePercent >= 0 ? `Save ${savePercent}%` : `+${-savePercent}% cost`}
                </span>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-xl font-semibold text-white/70 mb-2">GH₵</span>
                <span className="text-5xl sm:text-6xl font-display font-bold tracking-tight">
                  <motion.span>{monthlyDisplay}</motion.span>
                </span>
              </div>
              <div className="text-sm text-white/60 mt-1">
                saved per month vs petrol
              </div>

              <div className="mt-7 space-y-4">
                <CostBar
                  label="Petrol"
                  amount={petrolDaily}
                  width={(petrolDaily / maxDaily) * 100}
                  barClass="bg-white/70"
                  detail={`@ ${petrolPrice} GHS/L · ${petrolConsumption} L/100km`}
                />
                <CostBar
                  label="Electric"
                  amount={evDaily}
                  width={(evDaily / maxDaily) * 100}
                  barClass="bg-gold"
                  detail={`@ ${electricityRate} GHS/kWh · ${evConsumption} kWh/100km`}
                />
              </div>

              <div className="mt-7 pt-6 border-t border-white/15 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xl font-bold">
                    GH₵{dailySave.toFixed(2)}
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">per day</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    GH₵{yearlySave.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">per year</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 p-6 rounded-2xl border-l-4 border-gold bg-gray-50 dark:bg-navy-deep">
          <h3 className="font-display text-lg font-semibold mb-2 flex items-center gap-2">
            <Lightbulb size={18} className="text-gold" />
            Real-world example
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            A BYD Atto 3 (16 kWh/100km) vs. a 2.0L petrol SUV (8.5L/100km) driven
            50km/day in Accra:
            <strong className="text-navy dark:text-gold"> ~GH₵38,000/year saved</strong>.
            That&apos;s a new phone every year, or school fees covered.
          </p>
        </div>
      </div>
    </section>
  );
}

function SliderInput({ label, value, onChange, min, max, step, icon: Icon }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Icon size={15} className="text-gold shrink-0" />
          {label}
        </label>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-24 px-2 py-1.5 text-right text-sm font-semibold bg-gray-50 dark:bg-panel border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-panel rounded-lg appearance-none accent-gold cursor-pointer"
      />
    </div>
  );
}

function CostBar({ label, amount, width, barClass, detail }) {
  return (
    <div>
      <div className="flex justify-between items-baseline text-xs mb-1.5">
        <span className="text-white/70 font-medium">{label}</span>
        <span className="font-semibold">
          GH₵{amount.toFixed(2)}
          <span className="text-white/50 font-normal">/day</span>
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
        <div
          className={`h-full rounded-full ${barClass} transition-all duration-300`}
          style={{ width: `${Math.max(width, 1.5)}%` }}
        />
      </div>
      <div className="mt-1 text-[11px] text-white/50">{detail}</div>
    </div>
  );
}
