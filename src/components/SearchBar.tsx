import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
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
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 text-white bg-white/15 border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-md transition-all duration-300 placeholder-white/60 text-sm sm:text-base"
          minLength={2}
          maxLength={80}
        />
        <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/70" size={16} />
      </div>

      {showResults && searchResults.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl max-h-60 sm:max-h-72 overflow-y-auto">
          {searchResults.slice(0, 8).map((result) => (
            <li key={result.id}>
              <button
                onClick={() => handleSelect(result)}
                className="w-full px-4 py-3 sm:py-3.5 text-left hover:bg-white/10 transition-all duration-200 flex items-center gap-3"
              >
                <FiMapPin className="text-white/50 flex-shrink-0" size={14} />
                <div className="flex flex-col">
                  <span className="font-medium text-white text-sm sm:text-base">{result.name}</span>
                  <span className="text-xs text-white/50">
                    {result.admin1 && `${result.admin1}, `}{result.country}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showResults && query.length >= 2 && searchResults.length === 0 && !isSearching && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 text-center text-white/60 text-sm">
          {t.noLocations}
        </div>
      )}

      {isSearching && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 text-center text-white/60 text-sm">
          {t.loading}
        </div>
      )}
    </div>
  );
}
