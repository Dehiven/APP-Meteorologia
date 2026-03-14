import { useWeatherStore } from '../store/weatherStore';

export function LoadingSpinner() {
  const { t } = useWeatherStore();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-white/70 mt-6 font-medium">{t.loading}</p>
    </div>
  );
}
