import React from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <WifiOff className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Tidak Ada Koneksi Internet
        </h1>
        <p className="text-gray-600 mb-6">
          Mohon periksa koneksi internet Anda
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}