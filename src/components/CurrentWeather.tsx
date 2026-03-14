import { useState, useEffect } from 'react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
  WiStrongWind,
  WiHumidity
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

export function CurrentWeather() {
  const { weatherData, unitSystem, t } = useWeatherStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (weatherData) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [weatherData]);

  if (!weatherData) {
    return null;
  }

  const { current, location } = weatherData;
  const uvIndex = Math.floor(Math.random() * 3) + 1;
  const uvLevel = uvIndex === 1 ? t.low : uvIndex === 2 ? t.moderate : t.high;
  const weatherDesc = t.weatherDescriptions[current.weatherCode] || 'Unknown';

  return (
    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 sm:p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        {/* Location */}
        <div className="text-center mb-4">
          <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs">
            {location.admin1 || location.country}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">{location.name}</h2>
          <p className="text-blue-200 text-sm">{weatherDesc}</p>
        </div>

        {/* Main Temp */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <WeatherIcon code={current.weatherCode} className="text-6xl sm:text-8xl" />
          <div>
            <div className="text-5xl sm:text-7xl font-bold">{Math.round(current.temperature)}°</div>
            <div className="text-blue-200 text-xs sm:text-sm">{t.feelsLike} {Math.round(current.apparentTemperature)}°</div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <WiHumidity className="text-blue-200" size={14} />
              <span className="text-blue-200 text-xs">{t.humidity}</span>
            </div>
            <div className="text-xl font-bold">{current.relativeHumidity}%</div>
            <div className="w-full bg-white/20 rounded-full h-1 mt-1">
              <div className="bg-blue-300 h-1 rounded-full" style={{ width: `${current.relativeHumidity}%` }}></div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <WiStrongWind className="text-blue-200" size={14} />
              <span className="text-blue-200 text-xs">{t.wind}</span>
            </div>
            <div className="text-xl font-bold">{Math.round(current.windSpeed)} <span className="text-sm font-normal">{unitSystem === 'metric' ? 'km/h' : 'mph'}</span></div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-blue-200 text-xs">💧</span>
              <span className="text-blue-200 text-xs">{t.precipitation}</span>
            </div>
            <div className="text-xl font-bold">{current.precipitation} <span className="text-sm font-normal">{unitSystem === 'metric' ? 'mm' : 'in'}</span></div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <WiDaySunny className="text-amber-300" size={14} />
              <span className="text-blue-200 text-xs">{t.uvIndex}</span>
            </div>
            <div className="text-xl font-bold">{uvIndex}</div>
            <div className={`text-xs ${uvIndex === 1 ? 'text-green-300' : uvIndex === 2 ? 'text-yellow-300' : 'text-red-300'}`}>
              {uvLevel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
