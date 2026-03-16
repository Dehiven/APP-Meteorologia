import { useState } from 'react';
import { WiDaySunny } from 'react-icons/wi';
import { FiX, FiMenu } from 'react-icons/fi';
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
  const { weatherData, isLoading, t, fetchWeather } = useWeatherStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectLocation = (location: GeocodingResult) => {
    fetchWeather(location);
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
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <WiDaySunny className="text-white text-lg" />
              </div>
              <h1 className="text-lg font-bold text-white">Weather</h1>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-md mx-4">
              <SearchBar />
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2">
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
