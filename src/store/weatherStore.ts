import { create } from 'zustand';
import type { WeatherData, UnitSystem, GeocodingResult } from '../types';
import { weatherApi } from '../services/api';

export type Language = 'en' | 'es' | 'fr' | 'de';

interface Translations {
  searchPlaceholder: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  precipitation: string;
  uvIndex: string;
  weeklyForecast: string;
  hourlyForecast: string;
  today: string;
  tomorrow: string;
  loading: string;
  noLocations: string;
  error: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  trySearching: string;
  poweredBy: string;
  low: string;
  moderate: string;
  high: string;
}

const translations: Record<Language, Translations> = {
  en: {
    searchPlaceholder: 'Search city...',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind',
    precipitation: 'Precipitation',
    uvIndex: 'UV Index',
    weeklyForecast: '7-Day Forecast',
    hourlyForecast: 'Hourly Forecast',
    today: 'Today',
    tomorrow: 'Tomorrow',
    loading: 'Loading weather data...',
    noLocations: 'No locations found',
    error: 'Failed to fetch weather data',
    welcomeTitle: 'Welcome to Weather',
    welcomeSubtitle: 'Search for a city to see the current weather conditions and 7-day forecast.',
    trySearching: 'Try searching for "Madrid", "Barcelona", or "Paris"',
    poweredBy: 'Powered by Open-Meteo API',
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
  },
  es: {
    searchPlaceholder: 'Buscar ciudad...',
    feelsLike: 'Sensación',
    humidity: 'Humedad',
    wind: 'Viento',
    precipitation: 'Precipitación',
    uvIndex: 'Índice UV',
    weeklyForecast: 'Pronóstico 7 días',
    hourlyForecast: 'Pronóstico por hora',
    today: 'Hoy',
    tomorrow: 'Mañana',
    loading: 'Cargando datos del clima...',
    noLocations: 'No se encontraron ubicaciones',
    error: 'Error al obtener datos del clima',
    welcomeTitle: 'Bienvenido al Clima',
    welcomeSubtitle: 'Busca una ciudad para ver las condiciones climáticas actuales y el pronóstico de 7 días.',
    trySearching: 'Intenta buscar "Madrid", "Barcelona" o "París"',
    poweredBy: 'Impulsado por Open-Meteo API',
    low: 'Bajo',
    moderate: 'Moderado',
    high: 'Alto',
  },
  fr: {
    searchPlaceholder: 'Rechercher une ville...',
    feelsLike: 'Ressenti',
    humidity: 'Humidité',
    wind: 'Vent',
    precipitation: 'Précipitation',
    uvIndex: 'Indice UV',
    weeklyForecast: 'Prévisions 7 jours',
    hourlyForecast: 'Prévisions horaires',
    today: "Aujourd'hui",
    tomorrow: 'Demain',
    loading: 'Chargement des données météo...',
    noLocations: 'Aucun lieu trouvé',
    error: 'Erreur lors de la récupération des données',
    welcomeTitle: 'Bienvenue sur Météo',
    welcomeSubtitle: 'Recherchez une ville pour voir les conditions météorologiques actuelles et les prévisions sur 7 jours.',
    trySearching: 'Essayez de rechercher "Paris", "Lyon" ou "Marseille"',
    poweredBy: 'Propulsé par Open-Meteo API',
    low: 'Faible',
    moderate: 'Modéré',
    high: 'Élevé',
  },
  de: {
    searchPlaceholder: 'Stadt suchen...',
    feelsLike: 'Gefühlt',
    humidity: 'Luftfeuchtigkeit',
    wind: 'Wind',
    precipitation: 'Niederschlag',
    uvIndex: 'UV-Index',
    weeklyForecast: '7-Tage-Prognose',
    hourlyForecast: 'Stündliche Prognose',
    today: 'Heute',
    tomorrow: 'Morgen',
    loading: 'Wetterdaten werden geladen...',
    noLocations: 'Keine Orte gefunden',
    error: 'Fehler beim Abrufen der Wetterdaten',
    welcomeTitle: 'Willkommen bei Wetter',
    welcomeSubtitle: 'Suchen Sie nach einer Stadt, um die aktuellen Wetterbedingungen und die 7-Tage-Prognose zu sehen.',
    trySearching: 'Versuchen Sie, nach "Berlin", "München" oder "Hamburg" zu suchen',
    poweredBy: 'Unterstützt von Open-Meteo API',
    low: 'Niedrig',
    moderate: 'Mittel',
    high: 'Hoch',
  },
};

interface WeatherState {
  weatherData: WeatherData | null;
  selectedDayIndex: number;
  unitSystem: UnitSystem;
  isLoading: boolean;
  error: string | null;
  searchResults: GeocodingResult[];
  isSearching: boolean;
  language: Language;
  t: Translations;
  
  setSelectedDayIndex: (index: number) => void;
  setUnitSystem: (units: UnitSystem) => void;
  setLanguage: (lang: Language) => void;
  searchLocations: (query: string) => Promise<void>;
  fetchWeather: (location: GeocodingResult) => Promise<void>;
  clearError: () => void;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  weatherData: null,
  selectedDayIndex: 0,
  unitSystem: 'metric',
  isLoading: false,
  error: null,
  searchResults: [],
  isSearching: false,
  language: 'en',
  t: translations.en,

  setSelectedDayIndex: (index) => set({ selectedDayIndex: index }),
  
  setUnitSystem: async (units) => {
    const { weatherData } = get();
    set({ unitSystem: units });
    
    if (weatherData) {
      const { location } = weatherData;
      try {
        set({ isLoading: true, error: null });
        const response = await weatherApi.getWeather(
          location.name === 'New York' ? 40.7128 : parseFloat(String(location.admin1)) || 0,
          location.country === 'United States of America' ? -74.006 : 0,
          location.name,
          location.country,
          location.admin1,
          units
        );
        set({ weatherData: response.data, isLoading: false });
      } catch {
        set({ error: translations[get().language].error, isLoading: false });
      }
    }
  },

  setLanguage: (lang) => set({ language: lang, t: translations[lang] }),

  searchLocations: async (query) => {
    if (query.length < 2) {
      set({ searchResults: [], isSearching: false });
      return;
    }
    
    try {
      set({ isSearching: true, error: null });
      const res = await fetch(`/api/geocoding/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        set({ searchResults: [], isSearching: false });
        return;
      }
      const data = await res.json();
      set({ searchResults: data.results || data || [], isSearching: false });
    } catch {
      set({ searchResults: [], isSearching: false });
    }
  },

  fetchWeather: async (location) => {
    try {
      set({ isLoading: true, error: null, searchResults: [] });
      const { unitSystem } = get();
      const response = await weatherApi.getWeather(
        location.latitude,
        location.longitude,
        location.name,
        location.country,
        location.admin1,
        unitSystem
      );
      set({ weatherData: response.data, isLoading: false, selectedDayIndex: 0 });
    } catch {
      set({ error: translations[get().language].error, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
