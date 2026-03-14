import { useWeatherStore } from '../store/weatherStore';

export function UnitSelector() {
  const { unitSystem, setUnitSystem } = useWeatherStore();

  return (
    <div className="flex items-center bg-white/5 rounded-lg border border-white/10 overflow-hidden">
      <button
        onClick={() => setUnitSystem('metric')}
        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
          unitSystem === 'metric'
            ? 'bg-amber-500 text-white'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnitSystem('imperial')}
        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
          unitSystem === 'imperial'
            ? 'bg-amber-500 text-white'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`}
      >
        °F
      </button>
    </div>
  );
}
