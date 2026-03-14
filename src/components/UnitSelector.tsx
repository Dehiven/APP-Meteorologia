import { useWeatherStore } from '../store/weatherStore';

export function UnitSelector() {
  const { unitSystem, setUnitSystem } = useWeatherStore();

  return (
    <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-1 border border-white/20">
      <button
        onClick={() => setUnitSystem('metric')}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
          unitSystem === 'metric'
            ? 'bg-white text-slate-800 shadow-lg'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnitSystem('imperial')}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
          unitSystem === 'imperial'
            ? 'bg-white text-slate-800 shadow-lg'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        °F
      </button>
    </div>
  );
}
