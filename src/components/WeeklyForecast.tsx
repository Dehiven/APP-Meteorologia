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
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-amber-500 rounded-full"></span>
        {t.weeklyForecast}
      </h3>
      
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {daily.time.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedDayIndex(index)}
            className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all min-w-[65px] ${
              selectedDayIndex === index
                ? 'bg-white text-blue-900'
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <span className={`text-xs font-medium ${selectedDayIndex === index ? 'text-blue-600' : 'text-white/60'}`}>
              {formatDayName(daily.time[index])}
            </span>
            <WeatherIcon 
              code={daily.weatherCode[index]} 
              className={`text-2xl ${selectedDayIndex === index ? 'text-blue-600' : 'text-white'}`} 
            />
            <div className="text-sm font-bold">{Math.round(daily.temperatureMax[index])}°</div>
            <div className={`text-xs ${selectedDayIndex === index ? 'text-blue-400' : 'text-white/40'}`}>
              {Math.round(daily.temperatureMin[index])}°
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
