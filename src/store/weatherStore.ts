import { create } from 'zustand';
import type { WeatherData, UnitSystem, GeocodingResult } from '../types';
import { weatherApi, geocodingApi } from '../services/api';

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
  savedLocations: string;
  addToFavorites: string;
  removeFromFavorites: string;
  weekdays: string[];
  weatherDescriptions: Record<number, string>;
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
    savedLocations: 'Saved Locations',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weatherDescriptions: {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    },
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
    savedLocations: 'Ubicaciones guardadas',
    addToFavorites: 'Agregar a favoritos',
    removeFromFavorites: 'Eliminar de favoritos',
    weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    weatherDescriptions: {
      0: 'Cielo despejado',
      1: 'Mayormente despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Niebla',
      48: 'Niebla helada',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna densa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia fuerte',
      71: 'Nieve ligera',
      73: 'Nieve moderada',
      75: 'Nieve fuerte',
      77: 'Granizo fino',
      80: 'Chubascos ligeros',
      81: 'Chubascos moderados',
      82: 'Chubascos fuertes',
      85: 'Chubascos de nieve ligeros',
      86: 'Chubascos de nieve fuertes',
      95: 'Tormenta',
      96: 'Tormenta con granizo ligero',
      99: 'Tormenta con granizo fuerte',
    },
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
    savedLocations: 'Lieux enregistrés',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    weatherDescriptions: {
      0: 'Ciel dégagé',
      1: 'Majoritairement dégagé',
      2: 'Partiellement nuageux',
      3: 'Couvert',
      45: 'Brouillard',
      48: 'Brouillard givrant',
      51: 'Bruine légère',
      53: 'Bruine modérée',
      55: 'Bruine dense',
      61: 'Pluie légère',
      63: 'Pluie modérée',
      65: 'Forte pluie',
      71: 'Neige légère',
      73: 'Neige modérée',
      75: 'Forte neige',
      77: 'Grains de neige',
      80: 'Averses légères',
      81: 'Averses modérées',
      82: 'Averses violentes',
      85: 'Averses de neige légères',
      86: 'Averses de neige fortes',
      95: 'Orage',
      96: 'Orage avec grêle légère',
      99: 'Orage avec grêle forte',
    },
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
    savedLocations: 'Gespeicherte Orte',
    addToFavorites: 'Zu Favoriten hinzufügen',
    removeFromFavorites: 'Aus Favoriten entfernen',
    weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    weatherDescriptions: {
      0: 'Klarer Himmel',
      1: 'Überwiegend klar',
      2: 'Teilweise bewölkt',
      3: 'Bedeckt',
      45: 'Nebel',
      48: 'Reifnebel',
      51: 'Leichter Nieselregen',
      53: 'Mäßiger Nieselregen',
      55: 'Dichter Nieselregen',
      61: 'Leichter Regen',
      63: 'Mäßiger Regen',
      65: 'Starker Regen',
      71: 'Leichter Schnee',
      73: 'Mäßiger Schnee',
      75: 'Starker Schnee',
      77: 'Schneegriesel',
      80: 'Leichte Regenschauer',
      81: 'Mäßige Regenschauer',
      82: 'Heftige Regenschauer',
      85: 'Leichte Schneeschauer',
      86: 'Heftige Schneeschauer',
      95: 'Gewitter',
      96: 'Gewitter mit leichtem Hagel',
      99: 'Gewitter mit starkem Hagel',
    },
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
  savedLocations: GeocodingResult[];
  
  setSelectedDayIndex: (index: number) => void;
  setUnitSystem: (units: UnitSystem) => void;
  setLanguage: (lang: Language) => void;
  searchLocations: (query: string) => Promise<void>;
  fetchWeather: (location: GeocodingResult) => Promise<void>;
  clearError: () => void;
  addSavedLocation: (location: GeocodingResult) => void;
  removeSavedLocation: (locationId: number) => void;
  isLocationSaved: (locationId: number) => boolean;
}

const loadSavedLocations = (): GeocodingResult[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('savedLocations');
  return saved ? JSON.parse(saved) : [];
};

const saveSavedLocations = (locations: GeocodingResult[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('savedLocations', JSON.stringify(locations));
};

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
  savedLocations: loadSavedLocations(),

  setSelectedDayIndex: (index) => set({ selectedDayIndex: index }),
  
  setUnitSystem: async (units) => {
    const { weatherData } = get();
    set({ unitSystem: units });
    
    if (weatherData) {
      const { location } = weatherData;
      try {
        set({ isLoading: true, error: null });
        const weatherData = await weatherApi.getWeather(
          location.latitude || 0,
          location.longitude || 0,
          location.name,
          location.country,
          location.admin1,
          units
        );
        set({ weatherData, isLoading: false });
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
      const results = await geocodingApi.search(query);
      set({ searchResults: results, isSearching: false });
    } catch {
      set({ searchResults: [], isSearching: false });
    }
  },

  fetchWeather: async (location) => {
    try {
      set({ isLoading: true, error: null, searchResults: [] });
      const { unitSystem } = get();
      
      let lat = location.latitude;
      let lon = location.longitude;
      
      if (!lat || !lon || lat === 0 || lon === 0) {
        const results = await geocodingApi.search(location.name);
        const exactMatch = results.find(
          r => r.name.toLowerCase() === location.name.toLowerCase() && 
               r.country === location.country
        );
        if (exactMatch) {
          lat = exactMatch.latitude;
          lon = exactMatch.longitude;
        } else if (results.length > 0) {
          lat = results[0].latitude;
          lon = results[0].longitude;
        }
      }
      
      const weatherData = await weatherApi.getWeather(
        lat,
        lon,
        location.name,
        location.country,
        location.admin1,
        unitSystem
      );
      set({ weatherData, isLoading: false, selectedDayIndex: 0 });
    } catch {
      set({ error: translations[get().language].error, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
  
  addSavedLocation: (location) => {
    const { savedLocations } = get();
    if (!savedLocations.find(l => l.id === location.id)) {
      const newLocations = [...savedLocations, location];
      saveSavedLocations(newLocations);
      set({ savedLocations: newLocations });
    }
  },
  
  removeSavedLocation: (locationId) => {
    const { savedLocations } = get();
    const newLocations = savedLocations.filter(l => l.id !== locationId);
    saveSavedLocations(newLocations);
    set({ savedLocations: newLocations });
  },
  
  isLocationSaved: (locationId) => {
    const { savedLocations } = get();
    return savedLocations.some(l => l.id === locationId);
  },
}));
