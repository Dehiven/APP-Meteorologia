import { useState, useEffect } from 'react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
  WiDirectionUp,
  WiDirectionDown
} from 'react-icons/wi';
import { useWeatherStore } from '../store/weatherStore';

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

const getDayName = (dateString: string, t: { today: string; tomorrow: string; weekdays: string[] }): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return t.today;
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return t.tomorrow;
  }
  
  const dayIndex = date.getDay();
  return t.weekdays[dayIndex] || '';
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
    <div className={`bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></span>
        {t.weeklyForecast}
      </h3>
      
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {daily.time.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedDayIndex(index)}
            className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all min-w-[80px] ${
              selectedDayIndex === index
                ? 'bg-gradient-to-br from-white to-white/90 text-slate-900 shadow-lg shadow-white/20'
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <span className={`text-sm font-semibold ${selectedDayIndex === index ? 'text-slate-600' : 'text-white/70'}`}>
              {getDayName(daily.time[index], t)}
            </span>
            <WeatherIcon 
              code={daily.weatherCode[index]} 
              className={`text-3xl ${selectedDayIndex === index ? 'text-amber-500' : 'text-white/90'}`} 
            />
            <div className="flex items-center gap-1 mt-1">
              <WiDirectionUp className={`text-xs ${selectedDayIndex === index ? 'text-red-500' : 'text-red-400'}`} />
              <span className={`text-base font-bold ${selectedDayIndex === index ? 'text-slate-800' : 'text-white'}`}>
                {Math.round(daily.temperatureMax[index])}°
              </span>
            </div>
            <div className="flex items-center gap-1">
              <WiDirectionDown className={`text-xs ${selectedDayIndex === index ? 'text-blue-500' : 'text-blue-400'}`} />
              <span className={`text-sm ${selectedDayIndex === index ? 'text-slate-500' : 'text-white/40'}`}>
                {Math.round(daily.temperatureMin[index])}°
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
