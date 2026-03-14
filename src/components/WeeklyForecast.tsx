import { useState, useEffect } from 'react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm,
  WiFog,
  WiDayCloudy
} from 'react-icons/wi';
import { useWeatherStore } from '../store/weatherStore';
import { formatDayName } from '../utils/weatherUtils';

const getWeatherIconComponent = (code: number) => {
  if (code === 0) return WiDaySunny;
  if (code === 1) return WiDaySunny;
  if (code === 2) return WiDayCloudy;
  if (code === 3) return WiCloudy;
  if (code === 45 || code === 48) return WiFog;
  if (code >= 51 && code <= 55) return WiRain;
  if (code >= 61 && code <= 65) return WiRain;
  if (code >= 71 && code <= 77) return WiSnow;
  if (code >= 80 && code <= 82) return WiRain;
  if (code >= 85 && code <= 86) return WiSnow;
  if (code >= 95) return WiThunderstorm;
  return WiCloudy;
};

const WeatherIcon = ({ code, className }: { code: number; className?: string }) => {
  const Icon = getWeatherIconComponent(code);
  return <Icon className={className} />;
};

export function WeeklyForecast() {
  const { weatherData, selectedDayIndex, setSelectedDayIndex, t } = useWeatherStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (weatherData) {
      setTimeout(() => setIsVisible(true), 200);
    } else {
      setIsVisible(false);
    }
  }, [weatherData]);

  if (!weatherData) {
    return null;
  }

  const { daily } = weatherData;

  return (
    <div className={`glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h3 className="text-base sm:text-xl font-semibold text-white mb-4 sm:mb-5 flex items-center gap-2">
        <span className="w-1 h-5 sm:h-6 bg-blue-400 rounded-full"></span>
        {t.weeklyForecast}
      </h3>
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
        {daily.time.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedDayIndex(index)}
            className={`flex-shrink-0 flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 min-w-[70px] sm:min-w-[90px] ${
              selectedDayIndex === index
                ? 'bg-white text-blue-900 shadow-xl'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <span className={`text-xs sm:text-sm font-semibold ${selectedDayIndex === index ? 'text-blue-600' : 'text-white/70'}`}>
              {formatDayName(daily.time[index])}
            </span>
            <WeatherIcon 
              code={daily.weatherCode[index]} 
              className={`text-2xl sm:text-3xl ${selectedDayIndex === index ? 'text-blue-600' : 'text-white'}`} 
            />
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <span className="font-bold text-sm sm:text-lg">{Math.round(daily.temperatureMax[index])}°</span>
              <span className={`text-xs ${selectedDayIndex === index ? 'text-blue-400' : 'text-white/50'}`}>
                {Math.round(daily.temperatureMin[index])}°
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
