import { useState, useRef, useEffect } from 'react';
import { WiDaySunny } from 'react-icons/wi';
import { FiX, FiMenu, FiStar, FiChevronDown } from 'react-icons/fi';
import { 
  SearchBar, 
  UnitSelector, 
  LanguageSelector,
  CurrentWeather, 
  WeeklyForecast, 
  HourlyForecast, 
  SavedLocations,
  LoadingSpinner, 
  ErrorMessage,
  WelcomeMessage 
} from './components';
import { useWeatherStore } from './store/weatherStore';
import type { GeocodingResult } from './types';

function App() {
  const { weatherData, isLoading, t, fetchWeather, savedLocations } = useWeatherStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const favoritesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
        setFavoritesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (location: GeocodingResult) => {
    fetchWeather(location);
    setFavoritesOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/5"></div>
        
        <div className="relative px-4 py-3">
          {/* Main Header Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <WiDaySunny className="text-white text-xl" />
              </div>
              <h1 className="text-lg font-bold text-white">ClimaLive</h1>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-md mx-4">
              <SearchBar />
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2">
              {/* Favorites Dropdown */}
              <div className="relative" ref={favoritesRef}>
                <button
                  onClick={() => setFavoritesOpen(!favoritesOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                    savedLocations.length > 0 
                      ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' 
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <FiStar fill={savedLocations.length > 0 ? 'currentColor' : 'none'} size={18} />
                  <span className="text-sm font-medium">{t.savedLocations}</span>
                  <FiChevronDown className={`transition-transform ${favoritesOpen ? 'rotate-180' : ''}`} size={14} />
                </button>
                
                {favoritesOpen && savedLocations.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="p-2 max-h-80 overflow-y-auto">
                      {savedLocations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => handleSelectLocation(location)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                            weatherData?.location.name === location.name
                              ? 'bg-cyan-500/20 border border-cyan-500/30'
                              : 'hover:bg-white/10 border border-transparent'
                          }`}
                        >
                          <div className="text-white font-semibold truncate">{location.name}</div>
                          <div className="text-white/50 text-xs truncate">
                            {location.admin1 && `${location.admin1}, `}{location.country}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <UnitSelector />
              <LanguageSelector />
            </div>

            {/* Mobile Controls Row */}
            <div className="flex md:hidden items-center gap-2">
              <UnitSelector />
              <LanguageSelector />
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 rounded-lg bg-white/10 border border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="text-white" size={20} />
              ) : (
                <FiMenu className="text-white" size={20} />
              )}
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className={`md:hidden mt-3 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 md:px-6 md:py-6 max-w-6xl mx-auto w-full">
        <ErrorMessage />
        
        <SavedLocations onSelectLocation={handleSelectLocation} />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : weatherData ? (
          <div className="space-y-4 md:space-y-6">
            <CurrentWeather />
            <WeeklyForecast />
            <HourlyForecast />
          </div>
        ) : (
          <WelcomeMessage />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 text-center">
        <p className="text-white/30 text-xs">{t.poweredBy}</p>
        <p className="text-white/20 text-xs mt-1">Developed by Dehiven Code</p>
      </footer>
    </div>
  );
}

export default App;
