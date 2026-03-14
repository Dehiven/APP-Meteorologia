import { useState } from 'react';
import { WiDaySunny } from 'react-icons/wi';
import { FiMenu, FiX } from 'react-icons/fi';
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
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <WiDaySunny className="text-white text-lg" />
              </div>
              <h1 className="text-xl font-bold text-white">Weather</h1>
            </div>
            
            <button 
              className="md:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div className="hidden md:flex items-center gap-3">
              <SearchBar />
              <div className="flex items-center gap-2">
                <UnitSelector />
                <LanguageSelector />
              </div>
            </div>
          </div>

          <div className={`md:hidden mt-3 space-y-3 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
            <SearchBar />
            <div className="flex items-center justify-center gap-2">
              <UnitSelector />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 py-6">
        <ErrorMessage />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : weatherData ? (
          <div className="space-y-5">
            <CurrentWeather />
            <WeeklyForecast />
            <HourlyForecast />
          </div>
        ) : (
          <WelcomeMessage />
        )}
      </main>

      <footer className="mt-auto py-4 px-3 text-center text-white/40 text-xs">
        <p>{t.poweredBy}</p>
        <p className="mt-1">Developed by Dehiven Code</p>
      </footer>
    </div>
  );
}

export default App;
