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
import { formatHour } from '../utils/weatherUtils';

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
  if (code === 85 || code === 86) return WiSnow;
  if (code >= 95) return WiThunderstorm;
  return WiCloudy;
};

const WeatherIcon = ({ code, className }: { code: number; className?: string }) => {
  const Icon = getWeatherIconComponent(code);
  return <Icon className={className} />;
};

export function HourlyForecast() {
  const { weatherData, selectedDayIndex, t } = useWeatherStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (weatherData) {
      setTimeout(() => setIsVisible(true), 400);
    } else {
      setIsVisible(false);
    }
  }, [weatherData]);

  if (!weatherData) {
    return null;
  }

  const { hourly, daily } = weatherData;
  
  const dayDate = new Date(daily.time[selectedDayIndex]);
  const dayStart = new Date(dayDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayDate);
  dayEnd.setHours(23, 59, 59, 999);

  const hourlyData: { time: string; temp: number; precip: number; code: number; humidity: number }[] = [];
  
  for (let i = 0; i < hourly.time.length; i++) {
    const hourDate = new Date(hourly.time[i]);
    if (hourDate >= dayStart && hourDate <= dayEnd) {
      hourlyData.push({
        time: hourly.time[i],
        temp: hourly.temperature[i],
        precip: hourly.precipitation[i],
        code: hourly.weatherCode[i],
        humidity: hourly.relativeHumidity[i],
      });
    }
  }

  if (hourlyData.length === 0) {
    for (let i = 0; i < 24; i++) {
      const hourDate = new Date(dayStart);
      hourDate.setHours(i);
      const idx = i;
      hourlyData.push({
        time: hourDate.toISOString(),
        temp: hourly.temperature[idx] || 0,
        precip: hourly.precipitation[idx] || 0,
        code: hourly.weatherCode[idx] || 3,
        humidity: hourly.relativeHumidity[idx] || 0,
      });
    }
  }

  return (
    <div className={`glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        <span className="w-1 h-5 sm:h-6 bg-amber-400 rounded-full"></span>
        <h3 className="text-base sm:text-xl font-semibold text-white">
          {t.hourlyForecast} - {formatHour(daily.time[selectedDayIndex]).split(',')[0]}
        </h3>
      </div>
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-4 rounded-xl bg-white/10 min-w-[60px] sm:min-w-[75px] hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-xs text-white/60 font-medium">
              {formatHour(hour.time).replace(':00 ', '').substring(0, 5)}
            </span>
            <WeatherIcon 
              code={hour.code} 
              className="text-lg sm:text-2xl text-white" 
            />
            <span className="font-bold text-white text-sm sm:text-lg">
              {Math.round(hour.temp)}°
            </span>
            {hour.precip > 0 && (
              <div className="flex items-center gap-0.5 text-xs text-blue-300">
                <span>💧</span>
                <span>{hour.precip.toFixed(1)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
