import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMapPin, FiNavigation } from 'react-icons/fi';
import { useWeatherStore } from '../store/weatherStore';
import type { GeocodingResult } from '../types';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { searchResults, isSearching, fetchWeather, searchLocations, clearError, t } = useWeatherStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.length >= 2) {
        searchLocations(query);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, searchLocations]);

  const handleSelect = (result: GeocodingResult) => {
    setQuery(result.name);
    setShowResults(false);
    clearError();
    fetchWeather(result);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="relative w-full px-5 py-3 pl-12 text-white bg-white/10 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/30 backdrop-blur-xl transition-all duration-300 placeholder-white/50 text-base shadow-lg"
          minLength={2}
          maxLength={80}
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-amber-400 transition-colors duration-300" size={18} />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <FiNavigation className="text-white/30" size={14} />
        </div>
      </div>

      {showResults && searchResults.length > 0 && (
        <ul className="absolute z-50 w-full mt-3 glass-darker rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto">
          {searchResults.slice(0, 8).map((result) => (
            <li key={result.id}>
              <button
                onClick={() => handleSelect(result)}
                className="w-full px-5 py-3.5 text-left hover:bg-white/10 transition-all duration-200 flex items-center gap-4 border-b border-white/5 last:border-b-0"
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-amber-400" size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-white truncate">{result.name}</span>
                  <span className="text-xs text-white/50 truncate">
                    {result.admin1 && `${result.admin1}, `}{result.country}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showResults && query.length >= 2 && searchResults.length === 0 && !isSearching && (
        <div className="absolute z-50 w-full mt-3 glass-darker rounded-2xl shadow-2xl p-5 text-center">
          <FiMapPin className="text-white/30 mx-auto mb-2" size={24} />
          <p className="text-white/60">{t.noLocations}</p>
        </div>
      )}

      {isSearching && (
        <div className="absolute z-50 w-full mt-3 glass-darker rounded-2xl shadow-2xl p-5 text-center">
          <div className="w-6 h-6 border-2 border-white/20 border-t-amber-400 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-white/60">{t.loading}</p>
        </div>
      )}
    </div>
  );
}
