import { useWeatherStore } from '../store/weatherStore';

export function UnitSelector() {
  const { unitSystem, setUnitSystem } = useWeatherStore();

  return (
    <div className="flex items-center gap-1 p-1.5 bg-white/10 rounded-xl border border-white/10">
      <button
        onClick={() => setUnitSystem('metric')}
        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
          unitSystem === 'metric'
            ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnitSystem('imperial')}
        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
          unitSystem === 'imperial'
            ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
      >
        °F
      </button>
    </div>
  );
}
