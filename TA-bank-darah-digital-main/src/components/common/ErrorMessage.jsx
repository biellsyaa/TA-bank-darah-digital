import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  const errorMessage = typeof message === 'string' 
    ? message 
    : message?.message || 'Terjadi kesalahan yang tidak diketahui';

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <p className="text-red-600 font-semibold">Terjadi Kesalahan</p>
        </div>
        <p className="text-red-500 mb-4">{errorMessage}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}