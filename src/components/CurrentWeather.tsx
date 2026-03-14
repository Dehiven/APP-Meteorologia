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
import { getWeatherDescription } from '../utils/weatherUtils';

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

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 p-4 sm:p-6 md:p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-amber-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                  {location.admin1 || location.country}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1">
                {location.name}
              </h2>
              <p className="text-blue-200 text-sm sm:text-lg mb-4">
                {getWeatherDescription(current.weatherCode)}
              </p>
              <div className="flex items-center gap-3 sm:gap-6">
                <WeatherIcon 
                  code={current.weatherCode} 
                  className="text-5xl sm:text-7xl md:text-9xl drop-shadow-2xl animate-pulse-slow" 
                />
                <div>
                  <div className="text-5xl sm:text-7xl md:text-8xl font-bold leading-none">
                    {Math.round(current.temperature)}°
                  </div>
                  <div className="text-blue-200 text-xs sm:text-sm mt-1 sm:mt-2">
                    {t.feelsLike} {Math.round(current.apparentTemperature)}°
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <WiHumidity className="text-blue-200" size={18} />
                  <div className="text-blue-200 text-xs sm:text-sm">{t.humidity}</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">{current.relativeHumidity}%</div>
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-blue-300 h-1.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${current.relativeHumidity}%` }}
                  ></div>
                </div>
              </div>
              <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <WiStrongWind className="text-blue-200" size={18} />
                  <div className="text-blue-200 text-xs sm:text-sm">{t.wind}</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {Math.round(current.windSpeed)} <span className="text-sm font-normal">{unitSystem === 'metric' ? 'km/h' : 'mph'}</span>
                </div>
              </div>
              <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <span className="text-blue-200">💧</span>
                  <div className="text-blue-200 text-xs sm:text-sm">{t.precipitation}</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {current.precipitation} <span className="text-sm font-normal">{unitSystem === 'metric' ? 'mm' : 'in'}</span>
                </div>
              </div>
              <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <WiDaySunny className="text-amber-300" size={18} />
                  <div className="text-blue-200 text-xs sm:text-sm">{t.uvIndex}</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">{uvIndex}</div>
                <div className={`text-xs sm:text-sm ${uvIndex === 1 ? 'text-green-300' : uvIndex === 2 ? 'text-yellow-300' : 'text-red-300'}`}>
                  {uvLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
