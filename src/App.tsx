import { useState } from 'react';
import { WiDaySunny } from 'react-icons/wi';
import { FiX, FiCloud } from 'react-icons/fi';
import { 
  SearchBar, 
  UnitSelector, 
  LanguageSelector,
  CurrentWeather, 
  WeeklyForecast, 
  HourlyForecast, 
  LoadingSpinner, 
  ErrorMessage,
  WelcomeMessage 
} from './components';
import { useWeatherStore } from './store/weatherStore';

function App() {
  const { weatherData, isLoading, t } = useWeatherStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pb-10">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-900/60 backdrop-blur-2xl border-b border-white/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <WiDaySunny className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl blur opacity-40"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  Weather
                </h1>
                <span className="text-[10px] text-white/40 hidden sm:block">Dehiven Code</span>
              </div>
            </div>

            {/* Desktop: Search + Controls */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <SearchBar />
              </div>
              <div className="flex items-center gap-2">
                <UnitSelector />
                <LanguageSelector />
              </div>
            </div>

            {/* Mobile: Menu Button */}
            <button 
              className="md:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="text-white" size={22} />
              ) : (
                <FiCloud className="text-white" size={22} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="glass-darker rounded-2xl p-4 space-y-4">
              <SearchBar />
              <div className="flex items-center justify-center gap-3">
                <UnitSelector />
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <ErrorMessage />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : weatherData ? (
          <div className="space-y-5 sm:space-y-6">
            <CurrentWeather />
            <WeeklyForecast />
            <HourlyForecast />
          </div>
        ) : (
          <WelcomeMessage />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 px-3 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white/35 text-xs sm:text-sm">
          <span>{t.poweredBy}</span>
          <span className="hidden sm:inline">•</span>
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-medium">
            Developed by Dehiven Code
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
