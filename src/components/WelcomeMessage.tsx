import { WiDaySunny } from 'react-icons/wi';
import { useWeatherStore } from '../store/weatherStore';

export function WelcomeMessage() {
  const { t } = useWeatherStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center px-4">
      <div className="relative">
        <WiDaySunny className="text-7xl sm:text-9xl text-white/30 animate-pulse" />
        <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full"></div>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-6 sm:mt-8 mb-2 sm:mb-3">
        {t.welcomeTitle}
      </h2>
      <p className="text-white/60 text-sm sm:text-lg max-w-md mb-6 sm:mb-8">
        {t.welcomeSubtitle}
      </p>
      <div className="flex items-center gap-2 text-white/40 text-xs sm:text-sm">
        <span>{t.trySearching}</span>
      </div>
    </div>
  );
}
