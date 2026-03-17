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
  WiHumidity,
  WiThermometer,
  WiSunrise,
  WiSunset,
  WiBarometer,
  WiDirectionUp
} from 'react-icons/wi';
import { FiStar } from 'react-icons/fi';
import { useWeatherStore } from '../store/weatherStore';

const getTemperatureGradient = (temp: number): string => {
  if (temp < 0) return 'from-indigo-900 via-purple-900 to-black';
  if (temp < 10) return 'from-blue-800 via-blue-900 to-slate-900';
  if (temp < 18) return 'from-teal-600 via-cyan-700 to-blue-800';
  if (temp < 25) return 'from-yellow-500 via-orange-500 to-amber-600';
  if (temp < 32) return 'from-orange-600 via-red-500 to-pink-600';
  return 'from-red-700 via-red-600 to-rose-800';
};

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

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  progress?: number;
  progressColor?: string;
}

const MetricCard = ({ icon, label, value, subValue, progress, progressColor = 'bg-white/40' }: MetricCardProps) => (
  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-white/80">{icon}</span>
      <span className="text-white/60 text-xs uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
    {subValue && <div className="text-white/50 text-sm">{subValue}</div>}
    {progress !== undefined && (
      <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
        <div 
          className={`${progressColor} h-1.5 rounded-full transition-all duration-500`} 
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    )}
  </div>
);

export function CurrentWeather() {
  const { weatherData, unitSystem, t, savedLocations, addSavedLocation, removeSavedLocation } = useWeatherStore();
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

  const { current, location, daily } = weatherData;
  const currentTemp = current.temperature;
  const gradientClass = getTemperatureGradient(currentTemp);
  const uvIndex = daily?.uvIndexMax?.[0] || 0;
  const uvLevel = uvIndex <= 2 ? t.low : uvIndex <= 5 ? t.moderate : t.high;
  const weatherDesc = t.weatherDescriptions[current.weatherCode] || 'Unknown';

  const sunrise = daily?.sunrise?.[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
  const sunset = daily?.sunset?.[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
  const maxTemp = daily?.temperatureMax?.[0];
  const minTemp = daily?.temperatureMin?.[0];

  const isSaved = savedLocations.some(l => l.name === location.name && l.country === location.country);

  const handleToggleSave = () => {
    if (isSaved) {
      const loc = savedLocations.find(l => l.name === location.name && l.country === location.country);
      if (loc) removeSavedLocation(loc.id);
    } else {
      addSavedLocation({
        id: Date.now(),
        name: location.name,
        latitude: location.latitude || 0,
        longitude: location.longitude || 0,
        country: location.country,
        admin1: location.admin1,
      });
    }
  };

  const getUvColor = () => {
    if (uvIndex <= 2) return 'bg-green-400';
    if (uvIndex <= 5) return 'bg-yellow-400';
    if (uvIndex <= 7) return 'bg-orange-400';
    return 'bg-red-400';
  };

  return (
    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`bg-gradient-to-br ${gradientClass} rounded-3xl overflow-hidden relative`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
              <WiDirectionUp className="text-white/80" />
              <span className="text-white/90 text-sm font-medium">{location.admin1 || location.country}</span>
            </div>
            <div className="flex items-center justify-center gap-3 mt-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{location.name}</h2>
              <button
                onClick={handleToggleSave}
                className={`p-2 rounded-xl transition-all ${
                  isSaved 
                    ? 'bg-amber-400 text-amber-900' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
                title={isSaved ? t.removeFromFavorites : t.addToFavorites}
              >
                <FiStar fill={isSaved ? 'currentColor' : 'none'} size={20} />
              </button>
            </div>
            <p className="text-white/70 text-base mt-1">{weatherDesc}</p>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
            <WeatherIcon code={current.weatherCode} className="text-7xl sm:text-9xl text-white drop-shadow-lg" />
            <div className="text-center">
              <div className="text-6xl sm:text-8xl font-bold text-white leading-none">{Math.round(current.temperature)}°</div>
              <div className="text-white/60 text-sm mt-2 flex items-center justify-center gap-1">
                <WiThermometer className="text-white" />
                <span>{t.feelsLike} {Math.round(current.apparentTemperature)}°</span>
              </div>
            </div>
          </div>

          {maxTemp !== undefined && minTemp !== undefined && (
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <WiDirectionUp className="text-red-400" />
                <span className="text-white font-semibold">{Math.round(maxTemp)}°</span>
              </div>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <WiDirectionUp className="text-blue-400 rotate-180" />
                <span className="text-white font-semibold">{Math.round(minTemp)}°</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <MetricCard
              icon={<WiHumidity className="text-cyan-300" size={18} />}
              label={t.humidity}
              value={`${current.relativeHumidity}%`}
              progress={current.relativeHumidity}
              progressColor="bg-cyan-400"
            />
            <MetricCard
              icon={<WiStrongWind className="text-blue-300" size={18} />}
              label={t.wind}
              value={Math.round(current.windSpeed)}
              subValue={unitSystem === 'metric' ? 'km/h' : 'mph'}
            />
            <MetricCard
              icon={<WiBarometer className="text-purple-300" size={18} />}
              label={t.precipitation}
              value={current.precipitation}
              subValue={unitSystem === 'metric' ? 'mm' : 'in'}
            />
            <MetricCard
              icon={<WiDaySunny className="text-yellow-300" size={18} />}
              label={t.uvIndex}
              value={uvIndex}
              subValue={uvLevel}
              progress={(uvIndex / 11) * 100}
              progressColor={getUvColor()}
            />
          </div>

          {(sunrise !== '--:--' || sunset !== '--:--') && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                <WiSunrise className="text-amber-300 text-3xl" />
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">Sunrise</div>
                  <div className="text-white font-semibold">{sunrise}</div>
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                <WiSunset className="text-orange-300 text-3xl" />
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">Sunset</div>
                  <div className="text-white font-semibold">{sunset}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
