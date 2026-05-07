import React from 'react';
import DonorCard from './DonorCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function DonorList({ donors, loading, error, onDonorClick, onRetry }) {
  if (loading) {
    return <LoadingSpinner message="Memuat data pendonor..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!donors || donors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
          <p className="text-gray-600 text-lg mb-2">Belum ada data pendonor</p>
          <p className="text-gray-500 text-sm">Tambahkan pendonor baru untuk memulai</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donors.map((donor) => (
        <DonorCard key={donor.id} donor={donor} onClick={onDonorClick} />
      ))}
    </div>
  );
}