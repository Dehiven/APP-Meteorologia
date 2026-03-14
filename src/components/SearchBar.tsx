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
          className="w-full px-4 py-2.5 pl-10 text-sm text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-500/50 focus:bg-white/15 transition-all placeholder:text-white/50"
          minLength={2}
          maxLength={80}
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
      </div>

      {showResults && searchResults.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-slate-800/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl z-50 max-h-56 overflow-y-auto">
          {searchResults.slice(0, 6).map((result) => (
            <li key={result.id}>
              <button
                onClick={() => handleSelect(result)}
                className="w-full px-3 py-2.5 text-left hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <FiMapPin className="text-white/40 flex-shrink-0" size={14} />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm text-white truncate">{result.name}</span>
                  <span className="text-xs text-white/40 truncate">
                    {result.admin1 && `${result.admin1}, `}{result.country}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showResults && query.length >= 2 && searchResults.length === 0 && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl p-3 text-center">
          <p className="text-white/50 text-sm">{t.noLocations}</p>
        </div>
      )}

      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl p-3 text-center">
          <p className="text-white/50 text-sm">{t.loading}</p>
        </div>
      )}
    </div>
  );
}
