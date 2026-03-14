import { useWeatherStore, type Language } from '../store/weatherStore';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useWeatherStore();
  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300">
        <FiGlobe className="text-white/70" size={16} />
        <span className="text-base">{currentLang?.flag}</span>
        <FiChevronDown className="text-white/50" size={14} />
      </button>
      
      <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
        <div className="glass-darker rounded-2xl p-1.5 shadow-2xl min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-200 ${
                language === lang.code
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.label}</span>
              {language === lang.code && (
                <span className="ml-auto w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
