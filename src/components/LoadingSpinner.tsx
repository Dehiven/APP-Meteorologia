import { useWeatherStore } from '../store/weatherStore';

export function LoadingSpinner() {
  const { t } = useWeatherStore();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-10 h-10 border-3 border-white/20 border-t-amber-400 rounded-full animate-spin"></div>
      <p className="text-white/60 text-sm mt-4">{t.loading}</p>
    </div>
  );
}
