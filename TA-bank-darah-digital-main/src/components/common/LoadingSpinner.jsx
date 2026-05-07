import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingSpinner({ message = 'Memuat data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader className="w-12 h-12 text-red-600 animate-spin mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}