import React from 'react';
import StockCard from './StockCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function StockList({ stocks, loading, error, onStockClick, onRetry }) {
  if (loading) {
    return <LoadingSpinner message="Memuat data stok darah..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!stocks || stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
          <p className="text-gray-600 text-lg mb-2">Belum ada data stok darah</p>
          <p className="text-gray-500 text-sm">Tambahkan stok darah untuk memulai</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stocks.map((stock) => (
        <StockCard key={stock.id} stock={stock} onClick={onStockClick} />
      ))}
    </div>
  );
}