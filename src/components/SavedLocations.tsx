import { useState, useEffect } from 'react';
import { FiStar, FiTrash2, FiPlus } from 'react-icons/fi';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayCloudy } from 'react-icons/wi';
import { useWeatherStore } from '../store/weatherStore';
import type { GeocodingResult } from '../types';

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

interface SavedLocationCardProps {
  location: GeocodingResult;
  onSelect: (location: GeocodingResult) => void;
  onRemove: (locationId: number) => void;
  isActive: boolean;
}

const SavedLocationCard = ({ location, onSelect, onRemove, isActive }: SavedLocationCardProps) => {
  const [temp, setTemp] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuickWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&timezone=auto`
        );
        const data = await res.json();
        setTemp(data.current?.temperature_2m);
        setWeatherCode(data.current?.weather_code || 0);
      } catch {
        setTemp(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuickWeather();
  }, [location]);

  const Icon = getWeatherIconComponent(weatherCode);

  return (
    <button
      onClick={() => onSelect(location)}
      className={`group relative flex items-center gap-3 p-3 rounded-2xl border transition-all w-full text-left ${
        isActive 
          ? 'bg-cyan-500/20 border-cyan-500/30' 
          : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-cyan-500/30' : 'bg-white/10'}`}>
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white/60 rounded-full animate-spin" />
        ) : (
          <Icon className="text-xl text-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold truncate">{location.name}</div>
        <div className="text-white/50 text-xs truncate">
          {location.admin1 && `${location.admin1}, `}{location.country}
        </div>
      </div>
      {temp !== null && (
        <div className="text-white font-bold text-lg">{Math.round(temp)}°</div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(location.id);
        }}
        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-red-400 transition-all"
      >
        <FiTrash2 size={16} />
      </button>
    </button>
  );
};

interface SavedLocationsProps {
  onSelectLocation: (location: GeocodingResult) => void;
}

export function SavedLocations({ onSelectLocation }: SavedLocationsProps) {
  const { savedLocations, removeSavedLocation, t, weatherData } = useWeatherStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const currentLocationName = weatherData?.location.name;

  if (savedLocations.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-4"
      >
        <div className="flex items-center gap-2">
          <FiStar className="text-amber-400" />
          <h3 className="text-lg font-semibold text-white">{t.savedLocations}</h3>
          <span className="text-white/40 text-sm">({savedLocations.length})</span>
        </div>
        <div className={`p-1 rounded-lg bg-white/5 text-white/60 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <FiPlus />
        </div>
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {savedLocations.map((location) => (
            <SavedLocationCard
              key={location.id}
              location={location}
              onSelect={onSelectLocation}
              onRemove={removeSavedLocation}
              isActive={location.name === currentLocationName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
