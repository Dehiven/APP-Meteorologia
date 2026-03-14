import { useWeatherStore } from '../store/weatherStore';
import { FiAlertCircle, FiX } from 'react-icons/fi';

export function ErrorMessage() {
  const { error, clearError, t } = useWeatherStore();

  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 flex items-center gap-3 mb-4">
      <FiAlertCircle className="text-red-400 flex-shrink-0" size={18} />
      <p className="text-white text-sm flex-1">{t.error}</p>
      <button
        onClick={clearError}
        className="text-white/60 hover:text-white p-1"
      >
        <FiX size={16} />
      </button>
    </div>
  );
}
