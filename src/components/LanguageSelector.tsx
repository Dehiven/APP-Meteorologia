import { useWeatherStore, type Language } from '../store/weatherStore';
import { FiGlobe } from 'react-icons/fi';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useWeatherStore();

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
        <FiGlobe size={14} />
        <span className="text-xs sm:text-sm font-medium">{languages.find(l => l.code === language)?.flag}</span>
      </button>
      <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="glass rounded-xl p-1.5 sm:p-2 shadow-xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-left transition-all duration-200 ${
                language === lang.code
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span className="text-xs sm:text-sm">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
