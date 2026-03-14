import { useWeatherStore } from '../store/weatherStore';
import { FiAlertCircle, FiX } from 'react-icons/fi';

export function ErrorMessage() {
  const { error, clearError, t } = useWeatherStore();

  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-500/20 backdrop-blur-xl border border-red-400/30 rounded-2xl p-4 flex items-center gap-3 mb-6 animate-shake">
      <FiAlertCircle className="text-red-400 flex-shrink-0" size={20} />
      <p className="text-white flex-1">{t.error}</p>
      <button
        onClick={clearError}
        className="text-white/60 hover:text-white transition-colors p-1"
      >
        <FiX size={18} />
      </button>
    </div>
  );
}
