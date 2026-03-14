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

  const hourlyData: { time: string; temp: number; precip: number; code: number }[] = [];
  
  for (let i = 0; i < hourly.time.length; i++) {
    const hourDate = new Date(hourly.time[i]);
    if (hourDate >= dayStart && hourDate <= dayEnd) {
      hourlyData.push({
        time: hourly.time[i],
        temp: hourly.temperature[i],
        precip: hourly.precipitation[i],
        code: hourly.weatherCode[i],
      });
    }
  }

  if (hourlyData.length === 0) {
    for (let i = 0; i < 24; i++) {
      const hourDate = new Date(dayStart);
      hourDate.setHours(i);
      hourlyData.push({
        time: hourDate.toISOString(),
        temp: hourly.temperature[i] || 0,
        precip: hourly.precipitation[i] || 0,
        code: hourly.weatherCode[i] || 3,
      });
    }
  }

  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-5 bg-amber-400 rounded-full"></span>
        <h3 className="text-base font-semibold text-white">
          {t.hourlyForecast}
        </h3>
      </div>
      
      <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center gap-1 p-2.5 rounded-xl bg-white/5 min-w-[55px]"
          >
            <span className="text-xs text-white/50">
              {formatHour(hour.time).substring(0, 5)}
            </span>
            <WeatherIcon code={hour.code} className="text-lg text-white" />
            <span className="text-sm font-bold text-white">
              {Math.round(hour.temp)}°
            </span>
            {hour.precip > 0 && (
              <span className="text-xs text-blue-300">💧{hour.precip.toFixed(1)}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
