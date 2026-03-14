import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base">{currentLang?.flag}</span>
        <FiGlobe className="text-white/70" size={14} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 min-w-[140px] overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  language === lang.code
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
