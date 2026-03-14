import { WiDaySunny } from 'react-icons/wi';
import { useWeatherStore } from '../store/weatherStore';

export function WelcomeMessage() {
  const { t } = useWeatherStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <WiDaySunny className="text-7xl sm:text-9xl text-white/20" />
      <h2 className="text-2xl font-bold text-white mt-6 mb-2">
        {t.welcomeTitle}
      </h2>
      <p className="text-white/50 text-sm max-w-xs mb-4">
        {t.welcomeSubtitle}
      </p>
      <p className="text-white/30 text-xs">
        {t.trySearching}
      </p>
    </div>
  );
}
